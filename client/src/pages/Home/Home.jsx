import React from "react";
import "./Home.scss";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   //check for if exists user then redirect from login to home page
  //   if (!localStorage.getItem("user")) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  return (
    <>
      <div className="home-main">
        <div className="home-content">
          <div className="content">
            <h2> shopping </h2>
            <h3>start</h3>
          </div>

          <div className="play_icon">
            <PlayCircleFilledWhiteOutlinedIcon className="play" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
