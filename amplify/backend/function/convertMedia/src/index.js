/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_DOCEO_BUCKETNAME
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const s3Util = require('./s3-util'),
	childProcessPromise = require('./child-process-promise'),
	path = require('path'),
	os = require('os'),
	EXTENSION = '.mp4',
	OUTPUT_BUCKET = process.env.STORAGE_DOCEO_BUCKETNAME,
	MIME_TYPE = 'video/mp4';

exports.handler = function (eventObject, context) {
	console.log('Event', eventObject);
	const eventRecord = eventObject.Records && eventObject.Records[0],
		inputBucket = eventRecord.s3.bucket.name,
		key = eventRecord.s3.object.key,
		id = context.awsRequestId,
		resultKey = key
			.replace('/origin', '/video')
			.replace(/\.[^.]+$/, EXTENSION),
		workdir = os.tmpdir(),
		inputFile = path.join(workdir, id + path.extname(key)),
		outputFile = path.join(workdir, 'converted-' + id + EXTENSION);

	console.log('converting', inputBucket, key, 'using', inputFile);
	return s3Util
		.downloadFileFromS3(inputBucket, key, inputFile)
		.then(() =>
			childProcessPromise.spawn(
				'/opt/ffmpeg',
				[
					'-loglevel',
					'error',
					'-y',
					'-i',
					inputFile,
					// '-f',
					// 'mp4',
					outputFile,
				],
				{env: process.env, cwd: workdir},
			),
		)
		.then(() => s3Util.getMeataDataFromS3(inputBucket, key))
		.then(metaData => {
			return s3Util.uploadFileToS3(
				OUTPUT_BUCKET,
				resultKey,
				outputFile,
				MIME_TYPE,
				metaData.Metadata,
			);
		})
		.then((...res) => {
			console.log('Uploaded', res);
		})
		.catch(err => {
			console.log('Error', err);
		});
};
