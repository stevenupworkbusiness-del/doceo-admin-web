/* Amplify Params - DO NOT EDIT
  ENV
  REGION
  STREAM_KEY
  STREAM_SECRET
Amplify Params - DO NOT EDIT */

const stream = require('getstream');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const feedClient = stream.connect(process.env.STREAM_KEY, process.env.STREAM_SECRET);
  let follows = [],
    unFollows = [];

  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    if (record.eventName == 'INSERT') {
      follows.push({
        source: 'related:' + record.dynamodb.NewImage.userId,
        target: 'tag:' + record.dynamodb.NewImage.tagId
      });
    } else if (record.eventName == 'REMOVE') {
      unFollows.push({
        source: 'related:' + record.dynamodb.OldImage.userId,
        target: 'tag:' + record.dynamodb.OldImage.tagId
      });
    }
  }

  try {
    await feedClient.followMany(follows);
    await feedClient.unfollowMany(unFollows);
  } catch (e) {
    console.log(e);
  }

  return Promise.resolve('Successfully processed DynamoDB record');
};
