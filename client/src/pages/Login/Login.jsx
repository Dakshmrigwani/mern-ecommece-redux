import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { clearError, userLogin } from "../../redux/user/userSlice";
import "../Register/Register.scss";

function Login() {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });

  const { error } = useSelector((state) => ({ ...state.user }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, password } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      toast.error("All fields are required");
    } else {
      await dispatch(userLogin({ values }));
      navigate("/");
    }
  };

  const loggedUser = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null;

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  React.useEffect(() => {
    //check for if exists user then redirect from login to home page
    if (loggedUser) {
      navigate(redirect);
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [navigate, redirect, error]);

  return (
    <div className="common_container">
      <div className="form-container">
        <form action="/" onSubmit={handleLogin}>
          <div className="heading">
            <h2>Login Now</h2>
          </div>

          <input
            type="text"
            placeholder="Enter Username"
            className="box"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="box"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <div className="flex-div">
            <button type="submit">Login</button>
            <Link to="/forgotpassword" className="link">
              Forgot Password ?
            </Link>
            <Link to="/register" className="link">
              Not Registered yet ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
