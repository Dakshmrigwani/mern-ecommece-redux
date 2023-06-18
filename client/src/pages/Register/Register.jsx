import React from "react";
import { Link } from "react-router-dom";
import "./Register.scss";
import FileBase from "react-file-base64";
import Img from "/src/img.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../redux/user/userSlice";
import { toast } from "react-hot-toast";

function Register() {
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const { loading, error } = useSelector((state) => state.user);

  React.useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, email, password, cpassword } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [profile, setProfile] = React.useState("");

  React.useEffect(() => {
    if (profile) {
      setValues({ ...values, image: profile.image });
    }
  }, [profile]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      cpassword === ""
    ) {
      toast.error("All fields are required");
    } else if (password !== cpassword) {
      toast.error("Both Passwords must be same");
    } else {
      dispatch(userRegister({ values, navigate, toast }));
      clearState();
    }
  };

  function clearState() {
    setValues({
      username: "",
      email: "",
      password: "",
      cpassword: "",
    });
  }

  return (
    <div className="common_container">
      <div className="form-container">
        <form action="/" onSubmit={handleRegister}>
          <div className="heading">
            <h2>Register Now</h2>
          </div>

          <div className="img_box">
            <img src={profile.image ? profile?.image : Img} alt="" />
          </div>
          <br />

          <div className="add-img">
            <FileBase
              type="file"
              id="fileInput"
              multiple={false}
              className="fileInput"
              onDone={({ base64 }) => setProfile({ image: base64 })}
            />
          </div>
          <br />

          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter Username"
            className="box"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter Email"
            className="box"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter Password"
            className="box"
            onChange={handleChange}
          />
          <input
            type="password"
            name="cpassword"
            value={cpassword}
            placeholder="Confirm Password"
            className="box"
            onChange={handleChange}
          />
          <div className="flex-div">
            <button type="submit">{loading ? "Loading..." : "Register"}</button>
            <Link to="/login" className="link">
              Alrady an account ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
