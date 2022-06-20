import React, { useState } from "react";
import axios from "axios";

function CreateApplication() {
  const current = new Date();
  const date = `${current.getFullYear()}/${
    current.getMonth() + 1
  }/${current.getDate()}/`;
  const [acronym, setAcronym] = useState("");
  const [rnumber, setRnumber] = useState("");
  const [description, setDescription] = useState("");
  const [startdate, setStartdate] = useState(date);
  const [enddate, setEnddate] = useState(date);

  const createNewApplication = () => {
    axios
      .post("/create_application", {
        app_acronym: acronym,
        app_rnumber: rnumber,
        app_description: description,
        app_start_date: startdate,
        app_end_date: enddate,
      })
      .then(() => {
        console.log("success");
        alert("success");
      });
  };
  return (
    <div>
      {date}
      <div id="create-application" className="container py-md-5">
        <div className="row align-items-center">
          <form>
            <div className="form-group">
              <label htmlFor="app-name-register" className="text-muted mb-1">
                <small>App Acronym</small>
              </label>
              <input
                id="create-application-name"
                className="form-control"
                type="text"
                placeholder="Enter the App Name"
                onChange={(event) => {
                  setAcronym(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="app-runningno" className="text-muted mb-1">
                <small>Rnumber</small>
              </label>
              <input
                id="app_R_number"
                className="form-control"
                type="number"
                placeholder="Enter the Rnumber"
                onChange={(event) => {
                  setRnumber(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="appdescription" className="text-muted mb-1">
                <small>Description</small>
              </label>
              <input
                id="app-description"
                className="form-control"
                type="text"
                placeholder="Description"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="startdate" className="text-muted mb-1">
                <small>Start Date</small>
              </label>
              <input
                id="start-date"
                className="form-control"
                type="date"
                placeholder="Start Date"
                defaultValue={date}
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
                placeholder="End Date"
                defaultValue={date}
                onChange={(event) => {
                  setEnddate(event.target.value);
                }}
              />
            </div>

            <button
              onClick={createNewApplication}
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

export default CreateApplication;
