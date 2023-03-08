import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import "./styles/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
function Profile() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetch("/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Do something with the user data
        console.log("current: ", data);
        setUserData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="main">
      <div className="container-lg py-5">
        <Stack gap={5}>
          <div className="profile-info">
            <div className="profile-label">Username:</div>
            <div className="profile-value">
              {userData.current_user_username}
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-label">Favorite Genre:</div>
            <div className="profile-value">{userData.current_user_genre}</div>
          </div>
          <div className="profile-info">
            <div className="profile-label">Favorite Platform:</div>
            <div className="profile-value">
              {userData.current_user_platform}
            </div>
          </div>
        </Stack>
      </div>
    </div>
  );
}

export default Profile;
