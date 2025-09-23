/*global module, require, Promise, console */

const aws = require('aws-sdk'),
	fs = require('fs'),
	s3 = new aws.S3(),
	downloadFileFromS3 = function (bucket, fileKey, filePath) {
		'use strict';
		console.log('downloading', bucket, fileKey, filePath);
		return new Promise(function (resolve, reject) {
			const file = fs.createWriteStream(filePath),
				stream = s3
					.getObject({
						Bucket: bucket,
						Key: fileKey,
					})
					.createReadStream();
			stream.on('error', reject);
			file.on('error', reject);
			file.on('finish', function () {
				console.log('downloaded', bucket, fileKey);
				resolve(filePath);
			});
			stream.pipe(file);
		});
	},
	getMeataDataFromS3 = function (bucket, fileKey) {
		return s3.headObject({Bucket: bucket, Key: fileKey}).promise();
	},
	uploadFileToS3 = function (
		bucket,
		fileKey,
		filePath,
		contentType,
		metaData,
	) {
		'use strict';
		console.log('uploading', bucket, fileKey, filePath, metaData);
		return s3
			.upload({
				Bucket: bucket,
				Key: fileKey,
				Body: fs.createReadStream(filePath),
				ACL: 'private',
				ContentType: contentType,
				Metadata: metaData,
			})
			.promise();
	};

module.exports = {
	downloadFileFromS3: downloadFileFromS3,
	getMeataDataFromS3: getMeataDataFromS3,
	uploadFileToS3: uploadFileToS3,
};
