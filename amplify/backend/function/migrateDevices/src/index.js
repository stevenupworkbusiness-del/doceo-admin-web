/* Amplify Params - DO NOT EDIT
	API_DOCEONEW_GRAPHQLAPIENDPOINTOUTPUT
	API_DOCEONEW_GRAPHQLAPIIDOUTPUT
	API_DOCEONEW_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const crypto = require("@aws-crypto/sha256-js");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { SignatureV4 } = require("@aws-sdk/signature-v4");
const { HttpRequest } = require("@aws-sdk/protocol-http");
const fetch = require("node-fetch");
const { decode } = require("js-base64");
const { StreamChat } = require("stream-chat");

const GRAPHQL_ENDPOINT = process.env.API_DOCEONEW_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const offset = process.env.OFFSET || 0;
const { Sha256 } = crypto;

const query = /* GraphQL */ `
  mutation CREATE_DEVICE($input: CreateUserDeviceInput!) {
    createUserDevice(input: $input) {
      id
      userId
      token
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const endpoint = new URL(GRAPHQL_ENDPOINT);
  let statusCode = 200;

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });

  const chatClient = new StreamChat(
    process.env.STREAM_KEY,
    process.env.STREAM_SECRET
  );

  const { users } = await chatClient.queryUsers(
    {},
    {},
    { limit: 59, offset: parseInt(offset) }
  );
  console.log(users.length);

  for (let i = 0; i < users.length; i++) {
    const userId = users[i].id;
    const { devices } = await chatClient.getDevices(userId);
    if (devices.length > 0) {
      console.log(userId, ":", devices.length);
    }
    for (let j = 0; j < devices.length; j++) {
      if (!devices[j].disabled) {
        const token = devices[j].id;

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
              input: {
                id: token + userId,
                token,
                userId,
              },
            },
          }),
          path: endpoint.pathname,
        });

        const signed = await signer.sign(requestToBeSigned);

        let body;
        let response;

        try {
          response = await fetch(
            `https:${endpoint.host}/${endpoint.pathname}`,
            signed
          );
          body = await response.json();
          if (body.errors) statusCode = 400;
          console.log(body.errors, body.errors[0].locations);
        } catch (error) {
          statusCode = 500;
          body = {
            errors: [
              {
                message: error.message,
              },
            ],
          };
        }
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
    body: "Success",
  };
};
