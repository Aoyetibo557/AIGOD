import React, { useState, useEffect } from "react";
import { Avatar, Input, Button, Text } from "@chakra-ui/react";
import { formatDate } from "../../utils/commonfunctions";
import { useAuth } from "../../utils/hooks/useAuth";
import { useUser } from "../../utils/hooks/useUser";
import { updateUser } from "../../queries/user";
import { updateToken } from "../../utils/auth";
import {
  changeImageFileName,
  uploadToS3,
  fetchProfileImage,
} from "../../utils/s3";
import "./userprofile.css";
import { NotificationAlert } from "../alert/notificationalert";

const UserProfile = () => {
  const { username } = useAuth();
  const { profile } = useUser(username || "");

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [msgType, setMsgType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [orginalData, setOrginalData] = useState({});
  const [formValues, setFormValues] = useState({
    fullname: profile?.fullname,
    email: profile?.email,
    username: profile?.username,
    profileImage: profile?.profile_image,
  });

  useEffect(() => {
    if (profile) {
      setFormValues({
        fullname: profile?.fullname,
        email: profile?.email,
        username: profile?.username,
        profileImage: profile?.profile_image,
      });
      setOrginalData({
        fullname: profile?.fullname,
        email: profile?.email,
        username: profile?.username,
        profileImage: profile?.profile_image,
      });
    }
  }, [profile]);

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
      setHasChanged(true);
    }
  };

  const handleUploadOnClickEvent = () => {
    const imageInput = document.getElementById("imageInput");
    imageInput.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (orginalData[name] !== value) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  };

  const handleUpdate = async () => {
    setError("");
    setMsgType("");
    setIsLoading(true);
    try {
      const updatedData = {};

      if (profile?.fullname !== formValues.fullname) {
        updatedData.fullname = formValues.fullname;
      }
      if (profile.email !== formValues.email) {
        updatedData.email = formValues.email;
      }
      if (profile?.username !== formValues.username) {
        updatedData.username = formValues.username;
      }
      if (file) {
        const imageUrl = changeImageFileName({
          fileName: file?.name,
          origin: "profile",
          userId: profile?.id,
        });
        setFile(file);
        // updatedData.profile_image = imageUrl;

        const { fileName, url } = await uploadToS3({
          file: file,
          fileName: imageUrl,
          userId: profile?.id,
          location: "profile_pictures",
        });
        updatedData.profile_image = url;
        setFormValues({ ...formValues, profileImage: url });
      }

      const response = await updateUser(profile.id, updatedData);
      if (response?.data.user) {
        setError("Profile updated successfully!");
        setMsgType("success");
        setHasChanged(false);
        // Update profile state with the new data
        setFormValues({
          ...formValues,
          fullname: response.data.user.fullname,
          email: response.data.user.email,
          username: response.data.user.username,
          profileImage: response.data.user.profile_image,
        });
        // updateToken(response.data.token);
      } else {
        setError("Error updating profile");
        setMsgType("error");
      }
    } catch (error) {
      setError(error.message);
      setMsgType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="userprofile__container">
      {error && <NotificationAlert type={msgType} message={error} />}
      <div className="userprofile__avater__container">
        <Avatar
          key={profile?.profile_image}
          src={`${formValues.profileImage}`}
          size="2xl"
          className="userprofile__avatar"
        />

        <div className="userprofile__avater__container-info">
          <div>
            <Input
              id="imageInput"
              type="file"
              hidden
              onChange={handleImageChange}
            />
            <label htmlFor="imageInput">
              <Button
                colorScheme="blue"
                variant="outline"
                size="xs"
                cursor="pointer"
                onClick={handleUploadOnClickEvent}>
                Upload
              </Button>
            </label>
          </div>
          <div className="info-username">@{profile?.username}</div>
          <div>
            <Text>
              <span className="info-sub-span">Joined</span>
              <span className="info-sub-date">
                {formatDate(profile?.created_date)}
              </span>
            </Text>
          </div>
        </div>
      </div>

      <form className="userprofile__form">
        <div>
          <label className="userprofile__label" htmlFor="fullname">
            Full Name
          </label>
          <input
            className="userprofile__input"
            name="fullname"
            value={formValues?.fullname}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="userprofile__label" htmlFor="email">
            Email
          </label>
          <input
            className="userprofile__input"
            name="email"
            value={formValues?.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="userprofile__label" htmlFor="password">
            Password
          </label>
          <input
            className="userprofile__input"
            name="password"
            placeholder="***************"
            type="password"
            readOnly
          />
        </div>

        {hasChanged && (
          <div className="btn__container">
            <Button
              id="saveChanges"
              colorScheme="blue"
              md={4}
              size="md"
              isLoading={isLoading}
              disabled={isLoading}
              onClick={handleUpdate}>
              {isLoading ? "Loading..." : "Save changes"}
            </Button>

            <Button
              id="cancelChanges"
              colorScheme="blue"
              variant="outline"
              md={4}
              size="md"
              disabled={isLoading}
              onClick={() => {
                setFormValues({
                  fullname: profile?.fullname,
                  email: profile?.email,
                  username: profile?.username,
                  profileImage: profile?.profile_image,
                });
                setHasChanged(false);
              }}>
              Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
