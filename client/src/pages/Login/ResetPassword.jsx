import React, { useEffect, useState } from "react";
import "../Register/Register.scss";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  clearError,
  clearMessage,
  resetUserPassword,
} from "../../redux/user/userSlice";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { error, message } = useSelector((state) => ({ ...state.user }));

  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handlePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("Password does not match");
    } else {
      dispatch(
        resetUserPassword({ token: params.token, password: newPassword })
      );
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
      navigate("/login");
    }
  }, [dispatch, error, message]);

  return (
    <div className="common_container">
      <div className="form-container">
        <form action="/" onSubmit={handlePassword}>
          <div className="heading">
            <h2>Reset Password</h2>
          </div>

          <input
            type="password"
            placeholder="New Password"
            className="box"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="box"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <div className="flex-div">
            <button type="submit">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
