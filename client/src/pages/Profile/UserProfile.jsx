import React, { useEffect } from "react";
import "./Profile.scss";
import ProfileImg from "../../images/pic-3.png";
import Modal from "../../components/Modal/Modal";
import axios from "axios";

function UserProfile() {
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);

  const [userInfo, setUserInfo] = React.useState({});

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");

  const fetchUserData = async () => {
    const response = await axios.get(
      "https://api-mern-ecommece.vercel.app/api/auth/me",
      {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user")).user_token
              : ""
          }`,
        },
      }
    );
    setUsername(response.data.username);
    setEmail(response.data.email);
    setUserInfo(response.data);
  };

  useEffect(() => {
    fetchUserData();
  }, [username, email, setUsername, setEmail]);

  return (
    <>
      <div className="user_profile_container">
        <div className="profile_box">
          <div className="profile__left">
            <div className="profile__img">
              <img
                src={userInfo?.image ? userInfo.image : ProfileImg}
                alt="/"
              />
            </div>
            <h2> {userInfo.username} </h2>
            <div className="edit_btn">
              <button onClick={() => setIsProfileModalOpen(true)}>
                edit profile
              </button>
            </div>
          </div>
          <div className="profile__right">
            <div className="profile_info">
              <div className="box">
                <label> Username </label>
                <span> {userInfo.username} </span>
              </div>
              <div className="box">
                <label> Email </label>
                <span> {userInfo.email} </span>
              </div>
              <div className="box">
                <label> Account Created On </label>
                <span> {String(userInfo?.createdAt).substr(0, 10)} </span>
              </div>

              <div className="profile_btns">
                <button> my orders </button>
                <button onClick={() => setIsPasswordModalOpen(true)}>
                  change password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isProfileModalOpen && (
        <Modal
          setIsProfileModalOpen={setIsProfileModalOpen}
          isProfile="profile"
          username={username}
          email={email}
          setUsername={setUsername}
          setEmail={setEmail}
        />
      )}
      {isPasswordModalOpen && (
        <Modal
          setIsPasswordModalOpen={setIsPasswordModalOpen}
          isPassword="password"
        />
      )}
    </>
  );
}

export default UserProfile;
