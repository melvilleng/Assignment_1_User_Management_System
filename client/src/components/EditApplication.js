import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

function EditApplication() {
  const current = new Date();
  const date = `${current.getFullYear()}/${
    current.getMonth() + 1
  }/${current.getDate()}`;
  const [showapp, setShowallapp] = useState([]);
  const [description, setDescription] = useState("");
  const [startdate, setStartdate] = useState(date);
  const [enddate, setEnddate] = useState(date);
  const { appname } = useParams();
  console.log(appname);

  const editNewApplication = () => {
    axios
      .post("/edit_application", {
        app_description: description,
        app_start_date: startdate,
        app_end_date: enddate,
        appname: appname,
      })
      .then(() => {
        console.log("success");
        alert("success");
      });
  };

  const showallapplication = async () => {
    await axios.get(`/showallapplication/${appname}`).then((response) => {
      console.log(response.data);
      setShowallapp(response.data);
    });
  };

  useEffect(() => {
    showallapplication();
  }, []);
  return (
    <div>
      <div id="create-application" className="container py-md-5">
        <div className="row align-items-center">
          <form>
            <div className="form-group">
              <label>
                <h3>Application:</h3>
              </label>
              <h3>{appname}</h3>
            </div>

            <div className="form-group">
              <label htmlFor="appdescription" className="text-muted mb-1">
                <small>Description</small>
              </label>
              <input
                id="app-description"
                className="form-control"
                type="text"
                placeholder={showapp.App_Description}
                defaultValue={showapp.App_Description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
            <h1>{moment(showapp.App_startDate).format("YYYY-MM-DD")}</h1>
            <div className="form-group">
              <label htmlFor="startdate" className="text-muted mb-1">
                <small>Start Date</small>
              </label>
              <input
                id="start-date"
                className="form-control"
                type="date"
                placeholder={moment(showapp.App_startDate).format("YYYY-MM-DD")}
                defaultValue={moment(showapp.App_startDate).format(
                  "YYYY-MM-DD"
                )}
                onChange={(event) => {
                  setStartdate(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="enddate" className="text-muted mb-1">
                <small>End Date</small>
              </label>
              <input
                id="end-date"
                className="form-control"
                type="date"
                placeholder={moment(showapp.App_endDate).format("YYYY-MM-DD")}
                defaultValue={moment(showapp.App_endDate).format("YYYY-MM-DD")}
                onChange={(event) => {
                  setEnddate(event.target.value);
                }}
              />
            </div>

            <button
              onClick={editNewApplication}
              className="py-3 mt-4 btn btn-lg btn-success btn-block"
            >
              Create New Application
            </button>
          </form>
        </div>
      </div>
      <div>
        {/* <button className="button" onClick={}>
          Back
        </button> */}
      </div>
    </div>
  );
}

export default EditApplication;
