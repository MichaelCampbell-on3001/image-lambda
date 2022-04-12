
const AWS = require('aws-sdk');

const s3 = new AWS.S3(); // we have an object that can do s3 things

exports.handler = async (event) => {

  // reading from our bucket
  let bucketName = event.Records[0].s3.bucket.name;
  let key = 'images.json';

  let object = await s3.getObject({ Bucket: bucketName, Key: key }).promise();
  let json = JSON.parse(object.Body.toString()); // convert our buffer, to a stringified value, convert to a js object.

  console.log(json);

  let { image1, image2 } = json.images;

  let result = image1 + image2;

  const payload = {
    statusCode: 200,
    body: JSON.stringify(result), // we'll stringify something else soon
  };
  return payload;
};