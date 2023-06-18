import React from "react";
import "./Modal.scss";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
  updateUserPassword,
  updateUserProfile,
} from "../../redux/user/userSlice";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

function Modal(props) {
  const {
    setIsProfileModalOpen,
    isProfile,
    setIsPasswordModalOpen,
    isPassword,
    username,
    email,
    setUsername,
    setEmail,
  } = props;

  const dispatch = useDispatch();

  // profile data

  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);

  const editProfile = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ username: newUsername, email: newEmail }));
    setIsProfileModalOpen(false);
    setUsername(newUsername);
    setEmail(newEmail);
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { error, message } = useSelector((state) => ({ ...state.user }));

  const changePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password does not match");
    } else if (oldPassword === newPassword) {
      toast.error("New password cannot be same as old password");
    } else {
      dispatch(updateUserPassword({ oldPassword, newPassword }));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [error, message]);

  return (
    <>
      {isProfile == "profile" && (
        <>
          <div className="modalBackground">
            <div className="modalContainer">
              <div
                className="close_modal"
                onClick={() => setIsProfileModalOpen(false)}
              >
                <CloseOutlinedIcon className="icon" />
              </div>
              <div className="title">
                <h1>Edit Profile</h1>
              </div>

              <div className="form_box">
                <form onSubmit={editProfile}>
                  <input
                    type="text"
                    defaultValue={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                  <input
                    type="text"
                    defaultValue={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                  <button type="submit">update profile</button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      {isPassword == "password" && (
        <>
          <>
            <div className="modalBackground">
              <div className="modalContainer">
                <div
                  className="close_modal"
                  onClick={() => setIsPasswordModalOpen(false)}
                >
                  <CloseOutlinedIcon className="icon" />
                </div>
                <div className="title">
                  <h1>Change Password</h1>
                </div>

                <div className="form_box">
                  <form onSubmit={changePassword}>
                    <input
                      type="password"
                      placeholder="Old Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit">change password</button>
                  </form>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}

export default Modal;
