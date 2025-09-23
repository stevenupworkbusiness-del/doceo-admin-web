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
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const { foreignId, time, userId, targetId } = event.arguments;
    const feedClient = stream.connect(process.env.STREAM_KEY, process.env.STREAM_SECRET);
    const userFeed = feedClient.feed('user', userId);

    try {
        await userFeed.updateActivityToTargets(foreignId, time, null, [`collection:${targetId}`]);
        return 'success';
    } catch (e) {
        console.log(e);
        return 'failed';
    }
};
