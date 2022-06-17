import React from "react";
import { useNavigate } from "react-router-dom";

function Application() {
  const navigate = useNavigate();

  const createapplication = () => {
    navigate("/create-application");
  };
  return (
    <div className="whoIsWatching">
      <div id="create-application-button">
        <button onClick={createapplication}>Create Application</button>
      </div>
      <div className="main-div">
        <h2>List of Application</h2>
      </div>
      <div className="memberDiv">
        <button className="addIcon">
          <span>Kaaban</span>
        </button>

        <button className="addIcon">
          <span>Edit Profile</span>
        </button>
      </div>
    </div>
  );
}

export default Application;
