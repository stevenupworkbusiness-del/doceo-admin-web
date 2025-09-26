import React, { useEffect, useState } from "react";
import {
  StreamChat,
  DefaultGenerics,
  ChannelData,
} from "stream-chat";
import { CreateUserToken } from "@/graphql/queries";
import { Auth, API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import Spinner from "../ui/Spinner";

interface UserProgress {
  username: string;
  productUse: string;
  vaa: number;
  supplementary: number | string;
  date: string;
  progress: string;
}

interface StreamIntegrationTableProps {
  selectedRoomId: any;
  setvalue: any;
  setRefreshing: any;
  setInterface2?: any;
}

interface SprintProgress extends Partial<ChannelData<DefaultGenerics>> {
  progress?: { [key: string]: number };
  sprintText?: { [key: string]: string };
}

const StreamIntegrationTable: React.FC<StreamIntegrationTableProps> = ({
  selectedRoomId,
  setvalue,
  setRefreshing,
  setInterface2,
}) => {
  const [loading, setLoading] = useState(false);

  const [userProgressData, setUserProgressData] = useState<UserProgress[]>([]);
  console.log("selectedRoomId: ", selectedRoomId);

  // Function to fetch the recording settings data
  const fetchRecordingSettings = async () => {
    setLoading(true);
    setRefreshing(true);
    setUserProgressData([]);
    let roomId = selectedRoomId;
    console.log("Starting fetchRecordingSettings with roomId:", roomId);

    try {
      // Get current authenticated user from Amplify
      const currentUser = await Auth.currentAuthenticatedUser();
      console.log("Current authenticated user:", currentUser);

      // Get userID from Amplify user
      const userID = currentUser.username || currentUser.attributes?.sub;
      console.log("Retrieved userID from Amplify:", userID);

      if (!userID) {
        throw new Error("User ID not found in Amplify auth");
      }

      // Store userID in localStorage for future use
      localStorage.setItem("userId", userID);

      const client = new StreamChat(
        process.env.NEXT_PUBLIC_STREAM_KEY as string,
        {
          enableInsights: true,
          enableWSFallback: true,
        }
      );
      console.log("Stream client initialized:", !!client);

      // Get Stream token
      console.log("Calling CreateUserToken with userID:", userID);
      const createTokenResponse = (await API.graphql({
        query: CreateUserToken,
        variables: {
          id: userID,
        },
      })) as GraphQLResult<any>;

      console.log("CreateUserToken response:", createTokenResponse);

      if (!createTokenResponse.data?.CreateUserToken?.token) {
        throw new Error("Failed to get token from CreateUserToken mutation");
      }

      const { token } = createTokenResponse.data.CreateUserToken;
      localStorage.setItem("token", token);
      console.log("Token received and stored:", !!token);

      // Connect user to Stream
      console.log("Connecting user to Stream...", { userID });
      const userConnection = await client.connectUser({ id: userID }, token);
      console.log("User connected to Stream:", !!userConnection);

      // Initialize and watch channels
      console.log("Initializing channels with roomId:", roomId);
      const recordingChannel = client.channel("recording", roomId);
      const sprintProgress = client.channel("sprint_progress", roomId);
      const recordingSettings = client.channel("recording_settings", roomId);

      console.log("recordingSettings", recordingSettings);
      console.log("recordingChannel", recordingChannel);
      console.log("sprintProgress", sprintProgress);

      console.log("Watching channels...");
      const [recordingWatch, sprintWatch, settingsWatch] = await Promise.all([
        recordingChannel.watch().catch((e) => {
          console.error("Error watching recording channel:", e);
          return null;
        }),
        sprintProgress.watch().catch((e) => {
          console.error("Error watching sprint progress:", e);
          return null;
        }),
        recordingSettings.watch().catch((e) => {
          console.error("Error watching recording settings:", e);
          return null;
        }),
      ]);

      console.log("Channel watch results:", {
        recordingWatch: !!recordingWatch,
        sprintWatch: !!sprintWatch,
        settingsWatch: !!settingsWatch,
      });

      // Process recording channel messages
      const messages = recordingChannel?.state?.messages;
      console.log("Recording channel messages:", messages?.length);

      // Process sprint progress data
      const sprintData = (sprintProgress.data as SprintProgress) || {
        progress: {},
        sprintText: {},
      };
      console.log("Sprint progress data:", sprintData);

      const progressList: UserProgress[] = [];

      if (messages) {
        messages.forEach((item: any) => {
          console.log("Processing message item:", item);
          const userId = item?.user?.id;
          let tempProgress = 0;
          let sprintText = "";

          if (sprintData?.progress && userId && userId in sprintData.progress) {
            tempProgress = sprintData.progress[userId];
          }

          if (
            sprintData?.sprintText &&
            userId &&
            userId in sprintData.sprintText
          ) {
            sprintText = sprintData.sprintText[userId] || "";
          }

          const newProgress: UserProgress = {
            username: item?.user?.name || "Unknown",
            productUse: item.text || "",
            vaa: item.effectValue || 0,
            supplementary: sprintText,
            date: new Date(item.created_at).toISOString().split("T")[0],
            progress: `${tempProgress}/180`,
          };

          progressList.push(newProgress);
        });
      }

      setUserProgressData(progressList);

      // Update recording settings value
      if (recordingSettings.data) {
        console.log("Recording settings data:", recordingSettings.data);
        setvalue(recordingSettings.data.showRecordButton ? "On" : "Off");
        setRefreshing(false);
        setInterface2(recordingSettings.data.interface);
      }
      console.log("Channel data set:", !!recordingChannel.data);
    } catch (error) {
      console.error("Detailed error in fetchRecordingSettings:", {
        error,
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      });

      if (error instanceof Error) {
        if (error.message.includes("auth")) {
          console.error("Authentication error - Please sign in again");
        } else if (error.message.includes("token")) {
          console.error("Token error - Unable to get Stream token");
        } else if (error.message.includes("channel")) {
          console.error("Channel error - Unable to access Stream channels");
        }
      }

      throw error; // Re-throw to be caught by the component
    } finally {
      setLoading(false);
    }
  };

  // Fetch the recording settings when the component mounts
  useEffect(() => {
    if (selectedRoomId) {
      fetchRecordingSettings().catch((error) => {
        console.error("Error in component:", error);
        // You might want to show an error message to the user here
      });
    }
  }, [selectedRoomId]);

  return (
    <div className="p-1">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Product Use</th>
              <th className="border px-4 py-2">Vaa</th>
              <th className="border px-4 py-2">Supplementary</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            {loading && <Spinner size={50} />}
            {userProgressData.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.productUse}</td>
                <td className="border px-4 py-2">{user.vaa}</td>
                <td className="border px-4 py-2">{user.supplementary}</td>
                <td className="border px-4 py-2">{user.date}</td>
                <td className="border px-4 py-2">{user.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {/* <h3>Recording Settings:</h3> */}
        </div>
      </div>
    </div>
  );
};

export default StreamIntegrationTable;
