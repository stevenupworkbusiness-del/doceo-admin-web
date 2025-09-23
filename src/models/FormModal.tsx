import { Storage } from "aws-amplify";

import React, { useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";

import { ErrorMessage, Field, Formik, FormikProps } from "formik";

import { useSelector, useDispatch } from "react-redux";

import { DefaultGenerics, Channel as StreamChatChannel } from "stream-chat";

// import { roomsActions, selectAnswerTo, selectReplyDraft, selectReplyTo, selectSelectedRoom, selectedJoinedRooms } from '@/lib/store/rooms';

import { useChatClient } from "@/lib/getstream/context";

import Spinner from "@/components/ui/Spinner";

// import useNotification from '@/lib/hooks/useNotification';

import axios from "axios";

import { useAuth } from "@/lib/hooks/useAuth";

import { useChatContext } from "stream-chat-react";

import type { TeamChatGenerics } from "@/types";

import { StreamChat, Event } from "stream-chat";

import { connect } from "getstream";

import { CreateUserToken } from "@/graphql/queries";

import { GraphQLResult } from "@aws-amplify/api-graphql";

import { Auth, withSSRContext, API } from "aws-amplify";

import { uploadImage } from "@/utils/uploadImage";

import { resizeImage } from "@/utils";

import { ChannelResponse } from "stream-chat";

// At the top of the file, add this interface

// declare module 'stream-chat' {}

type Props = {
  onHideModal: () => void;

  selectedRoom: string | { channel: { id: string } };

  value: string | undefined;

  setvalue: (val: string) => void;
};

const FormModal: React.FC<Props> = ({
  onHideModal,
  selectedRoom,
  value,
  setvalue,
}) => {
  console.log("value: ", value);

  const chatClient = useChatClient()?.client;

  const currentUser = useAuth();

  // Add these debug logs

  useEffect(() => {
    console.log("Auth current user:", currentUser);

    console.log("Chat client user:", chatClient?._user);

    console.log("LocalStorage userId:", localStorage.getItem("userId"));

    // Try getting Amplify user

    Auth.currentAuthenticatedUser()

      .then((user) => console.log("Amplify user:", user))

      .catch((err) => console.log("No Amplify user:", err));
  }, [currentUser, chatClient]);

  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);

  const dispatch = useDispatch();

  const [image, setImage] = useState<File | null>(null);

  const [videoUrl, setVideoUrl] = useState<string>("");

  const [fileType, setFileType] = useState<"image" | "video" | null>(null);

  const roomId =
    typeof selectedRoom === "string" ? selectedRoom : selectedRoom?.channel?.id;

  console.log("roomId:", roomId);

  const channel = useMemo(() => {
    console.log("Creating channel with:", { chatClient, roomId });

    if (!chatClient || !roomId) {
      console.log("Missing required data for channel creation:", {
        hasClient: !!chatClient,

        hasRoomId: !!roomId,
      });

      return null;
    }

    const newChannel = chatClient.channel("recording_settings", roomId);

    console.log("Created channel:", newChannel);

    return newChannel;
  }, [chatClient, roomId]);

  useEffect(() => {
    console.log("Channel in useEffect:", channel);

    if (!channel) {
      console.log("No channel available yet");

      return;
    }

    const watchChannel = async () => {
      try {
        console.log("Attempting to watch channel...");

        const channelData = await channel.watch();

        console.log("Channel data received:", channelData);

        const state = channel.state;

        console.log("Channel state:", state);

        const members = await channel.queryMembers({});

        console.log("Channel members:", members);
      } catch (error) {
        console.error("Error watching channel:", error);

        if (error instanceof Error) {
          console.error("Error name:", error.name);

          console.error("Error message:", error.message);

          console.error("Error stack:", error.stack);
        }
      }
    };

    watchChannel();

    return () => {
      console.log("Cleaning up channel watch effect");
    };
  }, [channel]);

  useEffect(() => {
    console.log("value: ", value);
    onSubmitOff();
  }, [value]);

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log("data: ", data);

      // If the returned URL is relative, prepend the current origin
      let url = data.url;
      if (url && !/^https?:\/\//i.test(url)) {
        // Use window.location.origin for client-side
        url = `${window.location.origin}${
          url.startsWith("/") ? "" : "/"
        }${url}`;
      }

      setVideoUrl(url);
      setFileType(file.type.startsWith("image/") ? "image" : "video");
      return url;
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      if (!chatClient) {
        throw new Error("Chat client not initialized");
      }

      let userID: string | null = null;

      if (image) {
        userID =
          currentUser?.id ||
          chatClient._user?.id ||
          localStorage.getItem("userId");

        if (!userID) {
          try {
            const currentUser = await Auth.currentAuthenticatedUser();

            userID = currentUser.username || currentUser.attributes?.sub;
          } catch (error) {
            console.log("Error getting authenticated user:", error);

            throw new Error(
              "User ID not found. Please ensure you are logged in."
            );
          }
        }

        if (!userID) {
          throw new Error("User ID is required for video upload");
        }

        // Use the video URL directly from the upload response

        if (videoUrl) {
          data.guidanceVideo = videoUrl;
        } else {
          console.error("Video upload failed or URL not available.");

          return;
        }
      }

      if (!roomId) {
        console.error("Room ID is missing.");

        return;
      }

      const channelData = {
        name: `recording:${roomId}`,

        room: roomId,

        showRecordButton: data.showRecordButton,

        interface: data.interface,

        ...data,
      };

      const newChannel = chatClient.channel("recording_settings", roomId);

      console.log("Creating new channel with data:", channelData);

      await newChannel.watch();

      // Update channel with the new data

      await newChannel.update(channelData, { text: "Channel Updated" });

      // Force a channel query to ensure data is updated

      await newChannel.query({ state: true });

      // Emit a standard event with proper typing

      chatClient.dispatchEvent({
        type: "channel.updated",

        channel_type: "recording_settings",

        channel_id: roomId,

        channel: newChannel.data as ChannelResponse<TeamChatGenerics>,

        message: {
          id: `settings-update-${Date.now()}`,

          text: "Settings updated",

          user_id: chatClient.userID || "",

          created_at: new Date().toISOString(),

          type: "regular",
        },
      });

      console.log("Channel updated successfully with data:", channelData);

      setvalue("On"); // Set value to "On" after successful submission

      // Only call onHideModal after successful submission

      onHideModal();

      return newChannel;
    } catch (error) {
      console.error("Error in onSubmit:", error);

      alert(
        error instanceof Error
          ? error.message
          : "An error occurred during submission"
      );
    } finally {
      setLoading(false);
    }
  };

  // showSprintGraph

  const onSubmitOff = async () => {
    try {
      if (!chatClient) {
        throw new Error("Chat client not initialized");
      }

      // Get userID for image upload only

      let userID: string | null = null;

      if (!roomId) {
        console.error("Room ID is missing.");

        return;
      }

      // Remove created_by_id from channel data

      const channelData = {
        showRecordButton: false,
      };

      const newChannel = chatClient.channel(
        "recording_settings",
        roomId,
        channelData
      );

      console.log("Creating new channel with data:", channelData);

      await newChannel.watch();

      await newChannel.updatePartial({
        set: channelData,
      });

      console.log("Channel recording Off successfully!", newChannel);

      return newChannel;
    } catch (error) {
      console.error("Error in form submission:", error);

      alert(
        error instanceof Error
          ? error.message
          : "An error occurred during submission"
      );
    }
  };

  const hideModal = () => {
    onHideModal();
  };

  const handleNext = () => {
    if (step < 4) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  return (
    <div className="block modal fade">
      <div className="modal-dialog modal-dialog-center max-h-[90vh] overflow-y-auto">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title">Record Creating {`(${step}/4)`}</h6>

            <button type="button" className="btn-close" onClick={hideModal}>
              &times;
            </button>
          </div>

          <div className="leading-relaxed modal-body text-muted">
            <Formik
              initialValues={{
                showRecordButton: true,

                interface: "vas",

                dailyLimit: 1,

                sprintLimit: 0,

                showSprintGraph: false,

                maxEffectValue: 5,

                minText: "",

                maxText: "",

                recordingHintText: "",

                sprintHintText: "",

                sprintGuidelines: "",

                guidanceVideo: "",

                guidanceAgreement: "",
              }}
              onSubmit={onSubmit}
            >
              {({ values, handleChange, handleSubmit, setFieldValue }) => (
                <form
                  className="p-6 space-y-4"
                  onSubmit={handleSubmit}
                  id="room-info-form"
                >
                  {/* Step 1 */}

                  {step === 1 && (
                    <>
                      <div>
                        <label className="label">Record Screen</label>

                        <select
                          className="form-control"
                          value={values.showRecordButton ? "true" : "false"}
                          onChange={(e) => {
                            setFieldValue(
                              "showRecordButton",
                              e.target.value === "true"
                            );
                          }}
                        >
                          <option value="false">off</option>

                          <option value="true">on</option>
                        </select>
                      </div>

                      <div>
                        <label className="label">Interface used</label>

                        <select
                          className="form-control"
                          value={values.interface}
                          onChange={(e) => {
                            setFieldValue("interface", e.target.value);
                          }}
                        >
                          <option value="vas">vas</option>
                        </select>
                      </div>

                      <div>
                        <label className="label">
                          Upper Limit (Number of times per day)
                        </label>
                        <select
                          className="form-control"
                          name="dailyLimit"
                          value={values.dailyLimit}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            setFieldValue("dailyLimit", value);
                          }}
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={-1}>Unlimited</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Step 2 */}

                  {step === 2 && (
                    <>
                      <div>
                        <label className="label">
                          Supplementary Explanation on Registration
                        </label>

                        <input
                          className="form-control"
                          name="recordingHintText"
                          onChange={handleChange}
                          value={values.recordingHintText}
                          placeholder="何の匂い？"
                        />
                      </div>

                      <div>
                        <label className="label">Vas Maximum Number</label>

                        {/* <input

                                                    className="form-control"

                                                    name="maxEffectValue"

                                                    type="number"

                                                    min="0"

                                                    value={values.maxEffectValue}

                                                    onChange={(e) => {

                                                        const value = Math.max(0, parseInt(e.target.value) || 0);

                                                        setFieldValue('maxEffectValue', value);

                                                    }}

                                                /> */}

                        <select
                          className="form-control"
                          value={values.maxEffectValue}
                          onChange={(e) => {
                            setFieldValue("maxEffectValue", e.target.value);
                          }}
                        >
                          <option value={5}>5</option>

                          <option value={10}>10</option>
                        </select>
                      </div>

                      <div>
                        <label className="label">Minimum Text</label>

                        <input
                          className="form-control"
                          name="minText"
                          onChange={handleChange}
                          value={values.minText}
                          placeholder="全く感じない"
                        />
                      </div>

                      <div>
                        <label className="label">Maximum Text</label>

                        <input
                          className="form-control"
                          name="maxText"
                          onChange={handleChange}
                          value={values.maxText}
                          placeholder="正常に感じる"
                        />
                      </div>
                    </>
                  )}

                  {/* Step 3 */}

                  {step === 3 && (
                    <>
                      <div>
                        <label className="label">Sprint graph</label>

                        <select
                          className="form-control"
                          value={values.showSprintGraph ? "true" : "false"}
                          onChange={(e) => {
                            setFieldValue(
                              "showSprintGraph",
                              e.target.value === "true"
                            );
                          }}
                        >
                          <option value="false">off</option>

                          <option value="true">on</option>
                        </select>
                      </div>

                      <div>
                        <label className="label">Maximum number of times</label>

                        <input
                          className="form-control"
                          name="sprintLimit"
                          type="number"
                          min="1"
                          value={values.sprintLimit}
                          onChange={(e) => {
                            const value = Math.max(
                              0,
                              parseInt(e.target.value) || 0
                            );

                            setFieldValue("sprintLimit", value);
                          }}
                          placeholder="何の匂い？"
                        />
                      </div>

                      <div>
                        <label className="label">
                          Supplementary Explanation
                        </label>

                        <input
                          className="form-control"
                          name="sprintHintText"
                          onChange={handleChange}
                          value={values.sprintHintText}
                        />
                      </div>

                      <div>
                        <label className="label">Explanation</label>

                        <textarea
                          className="form-control"
                          name="sprintGuidelines"
                          onChange={handleChange}
                          value={values.sprintGuidelines}
                        />
                      </div>
                    </>
                  )}

                  {/* Step 4 */}
                  {step === 4 && (
                    <>
                      <div>
                        <label className="label">User agreement</label>

                        <input
                          className="form-control"
                          name="guidanceAgreement"
                          onChange={handleChange}
                          value={values.guidanceAgreement}
                          placeholder="Agree to the terms"
                        />
                      </div>

                      <div>
                        <input
                          className="hidden"
                          id="file-input"
                          name="file"
                          onChange={async (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const files = e.target.files;
                            if (
                              files &&
                              files.length > 0 &&
                              files[0] instanceof File
                            ) {
                              setImage(files[0]);
                              await handleFileUpload(files[0]);
                            }
                          }}
                          type="file"
                          accept="image/*,video/*"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("file-input")?.click()
                          }
                          className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded text-sm px-4 py-2"
                        >
                          Upload Media
                        </button>

                        {videoUrl && (
                          <div className="mt-2">
                            {fileType === "image" ? (
                              <img
                                src={videoUrl}
                                alt="Uploaded guidance"
                                className="max-w-xs rounded"
                              />
                            ) : (
                              <video
                                controls
                                className="max-w-xs rounded"
                                src={videoUrl}
                              >
                                Your browser does not support the video tag.
                              </video>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Submit Button inside Formik Form */}

                  {step === 4 && (
                    <div className="w-full flex flex-end justify-end">
                      <button
                        type="submit"
                        ref={submitButtonRef}
                        className="hidden"
                      >
                        Hidden Submit
                      </button>
                    </div>
                  )}
                </form>
              )}
            </Formik>

            <div className="modal-footer">
              <button
                onClick={hideModal}
                type="button"
                className="focus:outline-none text-white bg-red-500 hover:bg-red-600 font-medium rounded text-sm px-3 py-2 mr-2"
              >
                Close
              </button>

              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded text-sm px-3 py-2 mr-2"
                >
                  Back
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  if (step < 4) {
                    handleNext();
                  } else {
                    submitButtonRef.current?.click(); // Mimic Formik submit
                  }
                }}
                className={`text-white ${
                  step < 4
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-green-500 hover:bg-green-600"
                } font-medium rounded text-sm px-3 py-2`}
              >
                {step < 4 ? "Next" : "Submit"}
              </button>
            </div>
          </div>
        </div>

        {loading && <Spinner size={50} />}
      </div>

      <div className="modal-overlay"></div>
    </div>
  );
};

export default FormModal;
