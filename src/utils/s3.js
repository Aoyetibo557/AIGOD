import AWS from "aws-sdk";
import _ from "lodash";
import { v4 as uuid } from "uuid";

const S3_BUCKET = process.env.REACT_APP_S3_NAME;
const REGION = process.env.REACT_APP_S3_REGION;

AWS.config.update({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const changeImageFileName = ({ fileName, origin, userId }) => {
  const splitName = fileName.split(".");
  const extension = splitName.at(-1);

  userId = !_.isEmpty(userId) ? userId : "UNKNOWN";

  const imageGuid = uuid();

  const result = `${userId}_${origin}_${imageGuid}.${extension}`;
  return result;
};

const uploadToS3 = async ({ file, fileName, userId, location }) => {
  if (!file) {
    return null;
  } else {
    const params = {
      Bucket: S3_BUCKET,
      Key: `${location}/${fileName}`,
      Body: file,
      ContentType: file.type,
    };
    const urlPrefix = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/profile_pictures/`;
    const url = `${urlPrefix}${fileName}`;
    try {
      const data = await myBucket.putObject(params).promise();

      return { fileName, url };
    } catch (err) {
      console.error(err);
      return { err };
    }
  }
};

const deleteFromS3 = async ({ location, fileName }) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: `${location}/${fileName}`,
  };

  try {
    const data = await myBucket.deleteObject(params).promise();
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const fetchProfileImage = async (imageUrl) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: `profile_pictures/${imageUrl}`,
  };
  const urlPrefix = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/profile_pictures/`;
  try {
    const data = await myBucket.getObject(params).promise();
    const url = `${urlPrefix}${imageUrl}`;
    return { url };
  } catch (err) {
    if (err.code === "NoSuchKey") {
      return { url: "", err: "Profile Image Not Found!" };
    }
  }
};

export { changeImageFileName, uploadToS3, deleteFromS3, fetchProfileImage };
