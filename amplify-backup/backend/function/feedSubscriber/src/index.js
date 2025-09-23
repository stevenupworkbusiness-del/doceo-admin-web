/* Amplify Params - DO NOT EDIT
  ANALYTICS_DOCEONEW_ID
  ANALYTICS_DOCEONEW_REGION
  API_DOCEONEW_GRAPHQLAPIENDPOINTOUTPUT
  API_DOCEONEW_GRAPHQLAPIIDOUTPUT
  API_DOCEONEW_GRAPHQLAPIKEYOUTPUT
  AUTH_DOCEONEW9D5671B29D5671B2_USERPOOLID
  ENV
  REGION
Amplify Params - DO NOT EDIT */ /* Amplify Params - DO NOT EDIT
  ANALYTICS_DOCEONEW_ID
  ANALYTICS_DOCEONEW_REGION
  API_DOCEONEW_GRAPHQLAPIENDPOINTOUTPUT
  API_DOCEONEW_GRAPHQLAPIIDOUTPUT
  API_DOCEONEW_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */ /* Amplify Params - DO NOT EDIT
  ENV
  REGION
  API_DOCEONEW_GRAPHQLAPIIDOUTPUT
  API_DOCEONEW_GRAPHQLAPIENDPOINTOUTPUT
  API_DOCEONEW_GRAPHQLAPIKEYOUTPUT
  STREAM_KEY
  STREAM_SECRET
Amplify Params - DO NOT EDIT */

const crypto = require("@aws-crypto/sha256-js");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { SignatureV4 } = require("@aws-sdk/signature-v4");
const { HttpRequest } = require("@aws-sdk/protocol-http");
const fetch = require("node-fetch");
const { decode } = require("js-base64");
const { StreamChat } = require("stream-chat");
const stream = require("getstream");
const {
  PinpointClient,
  ListTemplatesCommand,
  SendMessagesCommand,
} = require("@aws-sdk/client-pinpoint");
const {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const GRAPHQL_ENDPOINT = process.env.API_DOCEONEW_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_DOCEONEW_GRAPHQLAPIKEYOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const USERPOOL_ID = process.env.AUTH_DOCEONEW9D5671B29D5671B2_USERPOOLID;
const { Sha256 } = crypto;
const cognitoClient = new CognitoIdentityProviderClient({ region: AWS_REGION });

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const getAddress = async (userId) => {
  const chatClient = new StreamChat(
    process.env.STREAM_KEY,
    process.env.STREAM_SECRET
  );

  const res = await chatClient.getDevices(userId);

  return res.devices
    .filter((device) => !device["disabled"])
    .reduce((acc, device) => {
      acc[device.id] = { ChannelType: "GCM" };
      return acc;
    }, {});
};

const getEmail = async (doctorId) => {
  try {
    // Fetch user details by username (UserID)
    const params = {
      UserPoolId: USERPOOL_ID, // Replace with your Cognito User Pool ID
      Username: doctorId, // UserID or username of the Cognito user
    };

    const response = await cognitoClient.send(new AdminGetUserCommand(params));
    const emailAttribute = response.UserAttributes.find(
      (attribute) => attribute.Name === "email"
    );

    if (emailAttribute) {
      return emailAttribute.Value; // Returns the email value
    } else {
      throw new Error("Email attribute not found");
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    throw error;
  }
};

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });
  let statusCode = 200;
  let body;
  let response;

  const chatClient = new StreamChat(
    process.env.STREAM_KEY,
    process.env.STREAM_SECRET
  );

  for (let i = 0; i < event.Records.length; i++) {
    const { body } = event.Records[i];
    const decoded = JSON.parse(decode(body));

    for (let j = 0; j < decoded.length; j++) {
      const record = decoded[j];
      const feed = record.feed;
      console.log(record);

      try {
        if (feed.startsWith("user") && feed != "user:all") {
          const userId = feed.slice(5);
          const res = await chatClient.queryUsers({
            id: userId,
          });

          if (res.users.length) {
            const user = res.users[0];
            let currentCount = user.feedCount ?? 0;
            currentCount += record.new.length - record.deleted.length;

            await chatClient.partialUpdateUser({
              id: userId,
              set: {
                feedCount: currentCount,
              },
            });
          }
        } else if (feed.startsWith("tag")) {
          const tagId = feed.slice(4);
          const query = /* GraphQL */ `
            query LIST_USERTAGS {
              getTag(id: "${tagId}") {
                id
                feedsCount
              }
            }
          `;
          const requestToBeSigned = new HttpRequest({
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              host: endpoint.host,
            },
            hostname: endpoint.host,
            body: JSON.stringify({ query }),
            path: endpoint.pathname,
          });
          const signed = await signer.sign(requestToBeSigned);

          response = await fetch(
            `https:${endpoint.host}/${endpoint.pathname}`,
            signed
          );
          const resBody = await response.json();
          if (resBody.errors) {
            statusCode = 400;
          } else {
            let tag = resBody.data.getTag,
              currentCount = tag.feedsCount ?? 0;
            currentCount += record.new.length - record.deleted.length;

            const mutation = /* GraphQL */ `
              mutation UPDATE_TAG($input: UpdateTagInput!) {
                updateTag(input: $input) {
                  id
                  name
                  feedsCount
                }
              }
            `;
            const mutationRequest = new HttpRequest({
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                host: endpoint.host,
              },
              hostname: endpoint.host,
              body: JSON.stringify({
                query: mutation,
                variables: { input: { id: tagId, feedsCount: currentCount } },
              }),
              path: endpoint.pathname,
            });
            const signedMutation = await signer.sign(mutationRequest);

            const updateRes = await fetch(
              `https:${endpoint.host}/${endpoint.pathname}`,
              signedMutation
            );
            const updateResBody = await updateRes.json();
            console.log("Update Tag:", updateResBody);
          }
        } else if (feed == "room_qa") {
          const roomId = feed.slice(8);
          const res = await chatClient.queryChannels({
            id: roomId,
          });
          const roomChannel = chatClient.channel("room", roomId);

          if (res.length) {
            const room = res[0];
            let currentCount = room.data["roomQACount"] ?? 0;
            currentCount += record.new.length - record.deleted.length;

            await roomChannel.updatePartial({
              set: {
                roomQACount: currentCount,
              },
            });
          }
        } else if (
          feed.startsWith("room") ||
          feed.startsWith("notification_qa")
        ) {
          const isQuestion = feed.startsWith("room_question");
          const isDoctor = feed.startsWith("room_doctor");
          const isResearch = feed.startsWith("room_research");
          const isQA = feed.startsWith("notification_qa");
          const roomId = isQA
            ? feed.slice(16)
            : feed.slice(isResearch ? 14 : isDoctor ? 12 : isQuestion ? 14 : 5);
          const res = await chatClient.queryChannels({
            id: roomId,
          });
          const roomChannel = chatClient.channel("room", roomId);

          if (res.length) {
            const room = res[0];
            let currentCount =
              (isResearch
                ? room.data["researchFeedsCount"]
                : isDoctor
                ? room.data["doctorFeedsCount"]
                : room.data["feedsCount"]) ?? 0;
            currentCount += record.new.length - record.deleted.length;

            await roomChannel.updatePartial({
              set: {
                [isResearch
                  ? "researchFeedsCount"
                  : isDoctor
                  ? "doctorFeedsCount"
                  : "feedsCount"]: currentCount,
              },
            });

            let id = undefined,
              ids = [];
            (addresses = {}), (doctors = []);

            // Get addresses of members in room
            while (true) {
              let usersRes = await roomChannel.queryMembers(
                {},
                { id: 1 },
                { user_id_gt: id }
              );

              for (let i = 0; i < usersRes.members.length; i++) {
                let user = usersRes.members[i].user;
                if (user.disable_notifciation_room_pos == "yes") {
                  continue;
                }
                if (user.role == "doctor") {
                  doctors.push(user);
                }
                ids.push(user.id);
                // let userAddresses = await getAddress(user.id);
                // addresses = {
                //   ...addresses,
                //   ...userAddresses,
                // };
              }

              if (usersRes.members.length < 100) {
                break;
              } else {
                id = usersRes.members[usersRes.members.length - 1].user_id;
              }
            }

            const query = /* GraphQL */ `
              query LIST_USERDEVICES($filter: ModelUserDeviceFilterInput) {
                listUserDevices(filter: $filter) {
                  items {
                    token
                    userId
                  }
                }
              }
            `;
            const requestToBeSigned = new HttpRequest({
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                host: endpoint.host,
              },
              hostname: endpoint.host,
              body: JSON.stringify({
                query,
                variables: {
                  filter: {
                    or: ids.map((cur) => {
                      return {
                        userId: { eq: cur },
                      };
                    }),
                  },
                },
              }),
              path: endpoint.pathname,
            });
            const signed = await signer.sign(requestToBeSigned);

            const response = await fetch(
              `https:${endpoint.host}/${endpoint.pathname}`,
              signed
            );
            const resBody = await response.json();
            console.log(resBody);
            const devices = resBody.data.listUserDevices.items;
            console.log(resBody.data.listUserDevices);
            addresses = devices.reduce((acc, cur) => {
              acc[cur.token] = { ChannelType: "GCM" };
              return acc;
            }, {});

            for (let i = 0; i < record.new.length; i++) {
              let newPost = record.new[i];
              let targetAddress = { ...addresses };
              delete targetAddress[newPost.actor.id];

              const client = new PinpointClient({
                region: process.env.ANALYTICS_DOCEONEW_REGION,
              });

              if (!(feed.startsWith("room") && newPost.verb == "qa")) {
                const command = new SendMessagesCommand({
                  ApplicationId: process.env.ANALYTICS_DOCEONEW_ID,
                  MessageRequest: {
                    Addresses: targetAddress,
                    MessageConfiguration: {
                      GCMMessage: {
                        Action: "OPEN_APP",
                        RawContent: JSON.stringify({
                          notification: {
                            title: "DOCEO",
                            body: isQuestion
                              ? "あなた宛に質問が届きました。アプリをご確認ください"
                              : isQA
                              ? `${room.data.name} ROOMに${newPost.object.actor.data.name}が新しい投稿を追加しました`
                              : `${room.data.name} ROOMに${
                                  isDoctor
                                    ? (newPost.actor.data.lastName ?? "") +
                                      "医師が新しい投稿を追加しました"
                                    : newPost.verb == "qa"
                                    ? newPost.actor.data.name +
                                      "が新しい投稿を追加しました"
                                    : "新しい投稿が追加されました"
                                }`,
                            icon: newPost.actor.data.avatar,
                          },
                          data: {
                            type: isResearch
                              ? "room_research"
                              : isQuestion
                              ? "room_question"
                              : "room_post",
                            room: roomId,
                          },
                        }),
                      },
                    },
                  },
                });

                try {
                  let res = await client.send(command);
                  console.log(res['MessageResponse']['Result']);
                } catch (e) {
                  console.log(e);
                }
              }

              // Doctor Email Notificaion
              if (!isDoctor && !isQA && !isQuestion) {
                let emails = {};
                for (let i = 0; i < doctors.length; i++) {
                  // let email = await getEmail(doctors[i]);
                  if (doctors[i].mailAddress) {
                    emails[doctors[i].mailAddress] = {
                      ChannelType: "EMAIL",
                    };
                  }
                }

                const emailCommand = new SendMessagesCommand({
                  ApplicationId: process.env.ANALYTICS_DOCEONEW_ID,
                  MessageRequest: {
                    Addresses: emails,
                    MessageConfiguration: {
                      EmailMessage: {
                        FromEmailAddress: "info@wivil.co.jp",
                        SimpleEmail: {
                          Subject: {
                            Charset: "utf-8",
                            Data: "あなたが担当するROOMに新しい投稿がされました",
                          },
                          HtmlPart: {
                            Charset: "utf-8",
                            Data: `<!DOCTYPE html>
                            <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width,initial-scale=1">
                                <meta name="x-apple-disable-message-reformatting">
                                <title>New Post - Doceo</title>
                                <link rel="preconnect" href="https://fonts.googleapis.com">
                                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                                <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500&display=swap" rel="stylesheet">
                                <style>
                                html, body {
                                    margin: 0 auto !important;
                                    max-width: 600px !important;
                                }

                                body {
                                    padding: 24px;
                                }

                                html, body, span, a, strong, p, label {
                                    color: #B4BABF;
                                    font-family: 'M PLUS Rounded 1c', sans-serif;
                                    font-size: 15px;
                                    font-weight: 500;
                                }

                                a {
                                    color: #B4BABF;
                                    transition: .3s ease;
                                }

                                a:hover, a:focus {
                                    color: #70A4F2;
                                }

                                p {
                                    margin-top: 0;
                                    margin-bottom: 18px;
                                }

                                .qa {
                                  padding: 13px 10px;
                                }

                                .bg-gray {
                                    background-color: #F8F8F8;
                                }

                                .bg-blue {
                                  background-color: #D2E8FB;
                                }

                                label {
                                    display: block;
                                    margin-bottom: 7px;
                                }

                                .question, strong {
                                    color: #282828;
                                    font-weight: 500;
                                }

                                .col {
                                    margin-bottom: 19px;
                                }

                                .user-info {
                                    display: flex;
                                    align-items: center;
                                }

                                .user-info img {
                                    margin-right: 10px;
                                }

                                .reply {
                                    display: inline-block;
                                    padding: 10px 18px;
                                    background-color: #70A4F2;
                                    border-radius: 4px;
                                    color: #fff !important;
                                    text-decoration: none;
                                    margin-top: 20px;
                                    margin-bottom: 47px;
                                }

                                .reply:hover, .reply:focus {
                                    background-color: #5b87c9;
                                }

                                footer {
                                    padding: 20px 24px;
                                }

                                footer p {
                                    margin-bottom: 28px;
                                }

                                .footer-bottom {
                                    display: flex;
                                    align-items: bottom;
                                    flex-wrap: wrap;
                                }

                                .footer-bottom img {
                                    margin-right: 16px;
                                    margin-bottom: 5px;
                                }

                                .footer-bottom span {
                                    margin-right: 32px;
                                }


                                .foooter-bottom a {
                                    color: #B4BABF !important;
                                    transition: .3s ease;
                                }

                                .foooter-bottom a:hover, .foooter-bottom a:focus {
                                    color: #70A4F2 !important;
                                }

                                @media(min-width: 420px) {
                                    .footer-bottom a {
                                        margin-left: auto;
                                    }
                                }
                                </style>
                            </head>
                            <body>
                                <main>
                                    <label>Context</label>
                                    <p class="${
                                      newPost["verb"] == "qa"
                                        ? "qa bg-blue"
                                        : ""
                                    }"><strong>${
                              newPost["message"]
                            }</strong></p>
                                    <div class="col">
                                        <label>User</label>
                                        <div class="user-info"><img class="avatar" src="${
                                          newPost["actor"]["data"]["avatar"]
                                        }" alt="Avatar" width="21" height="21" /> <strong>${
                              newPost["actor"]["data"]["name"]
                            }</strong></div>
                                    </div>
                                    <div class="col">
                                        <label>Room</label>
                                        <strong>${room.data.name}</strong>
                                    </div>
                                    <a href="https://main.d39tjydx9jeyry.amplifyapp.com/posts/" class="reply" target="_blank">ログイン</a>
                                </main>
                                <footer class="bg-gray">
                                    <p>専門医と作るバーチャルコミュニティ</p>
                                    <div class="footer-bottom">
                                        <img src="https://doctor-thumbnail.s3.ap-northeast-1.amazonaws.com/logo.png" alt="Doceo" width="105" height="19" />
                                        <span>＠Wivil.inc</span>
                                        <a href="https://doceo.jp" target="_blank">公式サイト</a>
                                    </div>
                                </footer>
                            </body>
                            </html>
                            `,
                          },
                        },
                      },
                    },
                  },
                });

                try {
                  let res = await client.send(emailCommand);
                  console.log(res);
                } catch (e) {
                  console.log(e);
                }
              }
            }
          }
        } else if (feed.startsWith("notification_")) {
          const [type, userId] = feed.split(":");
          const userRes = await chatClient.queryUsers({
            id: userId,
          });
          if (
            userRes.users.length == 0 ||
            (type == "notification_like" &&
              userRes.users[0].disable_notifciation_like == "yes") ||
            (type == "notification_comment" &&
              userRes.users[0].disable_notifciation_comment == "yes") ||
            (type == "notification_follow" &&
              userRes.users[0].disable_notifciation_follower == "yes")
          ) {
            continue;
          }

          for (let i = 0; i < record.new.length; i++) {
            let notification = record.new[i];
            console.log(notification.actor);
            if (userId == notification.actor.id) {
              continue;
            }
            // Get User devices
            let text;
            switch (type) {
              case "notification_like":
                text = `${
                  notification.actor.data.role == "doctor"
                    ? (notification.actor.data.lastName ?? "") + "医師"
                    : notification.actor.data.name + "さん"
                }が「${
                  notification.object.message.slice(0, 13) +
                  (notification.object.message.length > 13 ? "..." : "")
                }」をきにかけています`;
                break;
              case "notification_alert":
                text = `${notification.actor.data.lastName ?? ""}医師が「${
                  notification.object.message.slice(0, 13) +
                  (notification.object.message.length > 13 ? "..." : "")
                }」にコメントをしました`;
                break;
              case "notification_follow":
                text = `${notification.actor.data.name}さんがあなたのことをフォローしました`;
                break;
              case "notification_question":
                text = `あなた宛に質問が届きました。アプリをご確認ください `;
                break;
              case "notification_comment":
                text = `${notification.actor.data.name}さんが「${
                  notification.object.message.slice(0, 13) +
                  (notification.object.message.length > 13 ? "..." : "")
                }」にコメントをしました`;
                break;
            }
            const client = new PinpointClient({
              region: process.env.ANALYTICS_DOCEONEW_REGION,
            });
            const addresses = await getAddress(userId);
            const command = new SendMessagesCommand({
              ApplicationId: process.env.ANALYTICS_DOCEONEW_ID,
              MessageRequest: {
                Addresses: addresses,
                MessageConfiguration: {
                  GCMMessage: {
                    Action: "OPEN_APP",
                    RawContent: JSON.stringify({
                      notification: {
                        title: "DOCEO",
                        body: text,
                        icon: notification.actor.data.avatar,
                      },
                      data: {
                        type: type,
                        room:
                          type == "notification_question"
                            ? notification.object.room
                            : "",
                      },
                    }),
                  },
                },
              },
            });

            try {
              let res = await client.send(command);
              console.log(res.MessageResponse.Result);
            } catch (e) {
              console.log(e);
              continue;
            }
          }
        }
      } catch (e) {
        console.log("Error: ", e);
      }
    }
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // },
    body: JSON.stringify(body),
  };
};
