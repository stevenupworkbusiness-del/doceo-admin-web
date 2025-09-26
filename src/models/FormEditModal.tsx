
import React, { useEffect, useMemo, useRef, useState } from "react";

import { Formik } from "formik";

import { useChatClient } from "@/lib/getstream/context";

import Spinner from "@/components/ui/Spinner";

import { useAuth } from "@/lib/hooks/useAuth";

import type { TeamChatGenerics } from "@/types";

import { StreamChat } from "stream-chat";

import { CreateUserToken } from "@/graphql/queries";

import { GraphQLResult } from "@aws-amplify/api-graphql";

import { Auth, API } from "aws-amplify";

import { ChannelResponse } from "stream-chat";
import { createRecordingSettingsChannel, handleFileUpload, updateChannelWithEvent } from "@/utils";

// At the top of the file, add this interface

// declare module 'stream-chat' {}

type Props = {
  onHideModal: () => void;

  selectedRoom: string | { channel: { id: string } };

  value: string | undefined;

  setvalue: (val: string) => void;
};

const FormEditModal: React.FC<Props> = ({
  onHideModal,
  selectedRoom,
  value,
  setvalue,
}) => {
  console.log("value: ", value);

  const roomId =
    typeof selectedRoom === "string" ? selectedRoom : selectedRoom?.channel?.id;

  // Default initial values
  const defaultInitialValues = {
    showRecordButton: value,
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
  };
  const [initialValues, setInitialValues] = useState(defaultInitialValues);
  const [loading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    const fetchRecordingSettings = async () => {
      if (!roomId) return;
      setLoading(true); // Start loading
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        const userID = currentUser.username || currentUser.attributes?.sub;
        if (!userID) throw new Error("User ID not found in Amplify auth");
        const createTokenResponse = (await API.graphql({
          query: CreateUserToken,
          variables: { id: userID },
        })) as GraphQLResult<any>;
        const token = createTokenResponse?.data?.CreateUserToken?.token;
        if (!token) throw new Error("Failed to retrieve Stream token");
        const client = new StreamChat(
          process.env.NEXT_PUBLIC_STREAM_KEY as string,
          {
            enableInsights: true,
            enableWSFallback: true,
          }
        );
        await client.connectUser({ id: userID }, token);
        const channel = client.channel("recording_settings", roomId);
        await channel.watch();
        const data = channel.data || {};
        // Only pick the fields relevant to the form, with safe fallback
        setInitialValues({
          showRecordButton:
          typeof data.showRecordButton === 'boolean'
            ? data.showRecordButton
              ? 'On'
              : 'Off'
            : value || 'Off',
          interface:
            typeof data.interface === "string" ? data.interface : "vas",
          dailyLimit: typeof data.dailyLimit === "number" ? data.dailyLimit : 1,
          sprintLimit:
            typeof data.sprintLimit === "number" ? data.sprintLimit : 0,
          showSprintGraph:
            typeof data.showSprintGraph === "boolean"
              ? data.showSprintGraph
              : false,
          maxEffectValue:
            typeof data.maxEffectValue === "number" ? data.maxEffectValue : 5,
          minText: typeof data.minText === "string" ? data.minText : "",
          maxText: typeof data.maxText === "string" ? data.maxText : "",
          recordingHintText:
            typeof data.recordingHintText === "string"
              ? data.recordingHintText
              : "",
          sprintHintText:
            typeof data.sprintHintText === "string" ? data.sprintHintText : "",
          sprintGuidelines:
            typeof data.sprintGuidelines === "string"
              ? data.sprintGuidelines
              : "",
          guidanceVideo:
            typeof data.guidanceVideo === "string" ? data.guidanceVideo : "",
          guidanceAgreement:
            typeof data.guidanceAgreement === "string"
              ? data.guidanceAgreement
              : "",
        });
      } catch (error) {
        console.error("Error fetching recording settings:", error);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchRecordingSettings();
  }, [roomId]);

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

  const [step, setStep] = useState(1);

  const [image, setImage] = useState<File | null>(null);

  const [videoUrl, setVideoUrl] = useState<string>("");

  const [fileType, setFileType] = useState<"image" | "video" | null>(null);

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

  const submitButtonRef = useRef<HTMLButtonElement>(null);

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

      const processedData = {
				...data,
				showRecordButton: data.showRecordButton === 'On' ? true : false,
			};

			const channelData = {
				name: `recording:${roomId}`,

				room: roomId,

				interface: data.interface,

				...processedData,
			};

      const newChannel = await createRecordingSettingsChannel(chatClient, roomId);

      // Update channel with the new data

      updateChannelWithEvent(chatClient, newChannel, channelData);

      setvalue(data.showRecordButton); // Set value to "On" after successful submission

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
          {loading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <Spinner size={50} />
            </div>
          ) : (
            <>
              <div className="modal-header">
                <h6 className="modal-title">Record Creating {`(${step}/4)`}</h6>
                <button type="button" className="btn-close" onClick={hideModal}>
                  &times;
                </button>
              </div>
              <div className="leading-relaxed modal-body text-muted">
                <Formik
                  initialValues={initialValues}
                  enableReinitialize
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
                              value={values.showRecordButton}
                              onChange={(e) => {
                                setFieldValue(
                                  "showRecordButton",
                                  e.target.value
                                );
                              }}
                            >
                              <option value="On">On</option>

                              <option value="Off">Off</option>
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
                                if (files && files.length > 0 && files[0] instanceof File) {
                                  setImage(files[0]);
                                  const url = await handleFileUpload(files[0], setVideoUrl, setFileType);
                                  if (url) {
                                    setFieldValue("guidanceVideo", url);
                                    setVideoUrl(url);
                                    setFileType(files[0].type.startsWith("image/") ? "image" : "video");
                                  }
                                }
                              }}
                              type="file"
                              accept="image/*,video/*"
                            />

                            {/* Determine which media to show: uploaded, Formik value, or initial */}
                            {((videoUrl || values.guidanceVideo) && (fileType || (values.guidanceVideo && (values.guidanceVideo.endsWith('.mp4') || values.guidanceVideo.endsWith('.mov') || values.guidanceVideo.endsWith('.webm') ? 'video' : 'image')))) ? (
                              <div className="mt-2">
                                {/* Show image or video */}
                                {((fileType === 'image') || (values.guidanceVideo && !(values.guidanceVideo.endsWith('.mp4') || values.guidanceVideo.endsWith('.mov') || values.guidanceVideo.endsWith('.webm')))) ? (
                                  <img
                                    src={videoUrl || values.guidanceVideo}
                                    alt="Guidance"
                                    className="max-w-xs rounded mb-2"
                                  />
                                ) : (
                                  <video
                                    controls
                                    className="max-w-xs rounded mb-2"
                                    src={videoUrl || values.guidanceVideo}
                                  >
                                    Your browser does not support the video tag.
                                  </video>
                                )}
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    className="text-white bg-red-500 hover:bg-red-600 font-medium rounded text-sm px-3 py-1"
                                    onClick={() => {
                                      setImage(null);
                                      setVideoUrl("");
                                      setFileType(null);
                                      setFieldValue("guidanceVideo", "");
                                      // Also clear file input value
                                      const fileInput = document.getElementById("file-input") as HTMLInputElement;
                                      if (fileInput) fileInput.value = "";
                                    }}
                                  >
                                    Remove
                                  </button>
                                  <button
                                    type="button"
                                    className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded text-sm px-3 py-1"
                                    onClick={() => {
                                      document.getElementById("file-input")?.click();
                                    }}
                                  >
                                    Replace
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => document.getElementById("file-input")?.click()}
                                className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded text-sm px-4 py-2 mt-2"
                              >
                                Upload Media
                              </button>
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
                    className={`text-white ${step < 4
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-green-500 hover:bg-green-600"
                      } font-medium rounded text-sm px-3 py-2`}
                  >
                    {step < 4 ? "Next" : "Submit"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        {loading && <></>}
      </div>
      <div className="modal-overlay"></div>
    </div>
  );
};

export default FormEditModal;
