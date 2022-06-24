import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ExampleContext } from "../ExampleContext.js";
import axios from "axios";
import moment from "moment";

function Kaabanboard() {
  const app_acronym = useParams();
  const acronym_name = app_acronym.appname.toString();
  console.log(acronym_name);
  const [showplan, setShowplan] = useState([]);
  const [showtask, setShowtask] = useState([]);
  const [boardupdate, setBoardupdate] = useState(0);
  const { usernamestore } = useContext(ExampleContext);

  const showallplan = async () => {
    await axios.get(`/showplan/${acronym_name}`).then((response) => {
      console.log(response.data);
      setShowplan(response.data);
    });
  };

  const showalltask = async () => {
    await axios.get(`/showtask/${acronym_name}`).then((response) => {
      console.log(response.data);
      setShowtask(response.data);
    });
  };

  const promote_task = async (
    task_each_id,
    task_each_state,
    task_each_notes
  ) => {
    console.log(task_each_notes);
    await axios
      .post("/promote_task", {
        task_state: task_each_state,
        taskid: task_each_id,
        userid: usernamestore,
        tasknotes: task_each_notes,
      })
      .then((response) => {
        setBoardupdate(boardupdate + 1);
      });
  };

  const demote_task = async (
    task_each_id,
    task_each_state,
    task_each_notes
  ) => {
    await axios
      .post("/demote_task", {
        task_state: task_each_state,
        taskid: task_each_id,
        userid: usernamestore,
        tasknotes: task_each_notes,
      })
      .then((response) => {
        setBoardupdate(boardupdate + 1);
      });
  };

  useEffect(() => {
    showallplan();
    showalltask(); // eslint-disable-next-line
  }, [boardupdate]);

  return (
    <main className="flex-container">
      <div className="leftcontainer col-3">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <div className="card-actions float-right">
                <Link to={`/create-plan/${app_acronym.appname}`}>
                  <button>Create Plan</button>
                </Link>
              </div>
              <h1 className="card-title">Plan</h1>
            </div>
            <div className="leftinnerbodyplan">
              {showplan.map((indv_plan, indivdual_plan) => {
                return (
                  <div className="card-body p-3" key={indivdual_plan}>
                    <div className="card bg-secondary">
                      <div className="card-body p-3">
                        <p>Plan MVP Name: {indv_plan.Plan_MVP_name}</p>
                        <p>
                          Start Date:{" "}
                          {moment(indv_plan.Plan_startDate).format(
                            "DD-MM-YYYY"
                          )}
                        </p>
                        <p>
                          End Date:{" "}
                          {moment(indv_plan.Plan_endDate).format("DD-MM-YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="testcontainer">
        <Link to={`/create-task/${app_acronym.appname}`}>
          <button className="float-right">Create Task</button>
        </Link>
        <div className="rightcontainer p-0">
          <h1 className="h3 mb-3">Kanban Board</h1>
          <div className="row">
            <div className="col">
              <div className="card card-border-primary">
                <div className="card-header">
                  <div className="card-actions float-right"></div>
                  <h5 className="card-title">Open</h5>
                </div>
                <div className="rightinnerbodytask">
                  {showtask.map((eachtask) => {
                    if (eachtask.Task_state === "Open") {
                      return (
                        <div className="card-body">
                          <div className="card mb-3 bg-light">
                            <p className="card-right-title">
                              {eachtask.Task_owner}
                            </p>
                            <div className="card-body p-7">
                              <h6>Task Name:</h6>
                              <p>{eachtask.Task_name}</p>
                              <h6>Task Description:</h6>
                              <p>{eachtask.Task_description}</p>
                            </div>
                          </div>
                          <div>
                            <Link to={`/task/${eachtask.Task_id}`}>
                              <button className="btn btn-primary btn-block">
                                view
                              </button>
                            </Link>
                            <button
                              onClick={() =>
                                promote_task(
                                  eachtask.Task_id,
                                  eachtask.Task_state,
                                  eachtask.Task_notes
                                )
                              }
                            >
                              Move Right
                            </button>
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card-border-warning">
                <div className="card-header">
                  <div className="card-actions float-right"></div>
                  <h5 className="card-title">To-do-list</h5>
                </div>
                <div className="rightinnerbodytask">
                  {showtask.map((eachtask) => {
                    if (eachtask.Task_state === "To-do-list") {
                      return (
                        <div className="card-body">
                          <div className="card mb-3 bg-light">
                            <p className="card-right-title">
                              {eachtask.Task_owner}
                            </p>
                            <div className="card-body p-7">
                              <h6>Task Name:</h6>
                              <p>{eachtask.Task_name}</p>
                              <h6>Task Name:</h6>
                              <p>{eachtask.Task_name}</p>
                            </div>
                          </div>

                          <Link to={`/task/${eachtask.Task_id}`}>
                            <button className="btn btn-primary btn-block">
                              view
                            </button>
                          </Link>
                          <button
                            onClick={() =>
                              promote_task(
                                eachtask.Task_id,
                                eachtask.Task_state,
                                eachtask.Task_notes
                              )
                            }
                          >
                            Move Right
                          </button>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card-border-danger">
                <div className="card-header">
                  <div className="card-actions float-right"></div>
                  <h5 className="card-title">Doing</h5>
                </div>
                <div className="rightinnerbodytask">
                  {showtask.map((eachtask) => {
                    if (eachtask.Task_state === "Doing") {
                      return (
                        <div className="card-body">
                          <div className="card mb-3 bg-light">
                            <p className="card-right-title">
                              {eachtask.Task_owner}
                            </p>
                            <div className="card-body p-7">
                              <h6>Task Name:</h6>
                              <p>{eachtask.Task_name}</p>
                              <h6>Task Name:</h6>
                              <p>{eachtask.Task_name}</p>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              demote_task(
                                eachtask.Task_id,
                                eachtask.Task_state,
                                eachtask.Task_notes
                              )
                            }
                          >
                            Move Left
                          </button>

                          <button className="btn btn-primary btn-block">
                            View
                          </button>
                          <button
                            onClick={() =>
                              promote_task(
                                eachtask.Task_id,
                                eachtask.Task_state,
                                eachtask.Task_notes
                              )
                            }
                          >
                            Move Right
                          </button>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card-border-danger">
                <div className="card-header">
                  <div className="card-actions float-right"></div>
                  <h5 className="card-title">Done</h5>
                </div>
                <div className="rightinnerbodytask">
                  {showtask.map((eachtask) => {
                    if (eachtask.Task_state === "Done") {
                      return (
                        <div className="card-body">
                          <div className="card mb-3 bg-light">
                            <p className="card-right-title">
                              {eachtask.Task_owner}
                            </p>
                            <div className="card-body p-7">
                              <h6>Task Name:</h6>
                              <p>{eachtask.Task_name}</p>
                              <h6>Task Name:</h6>
                              <p>{eachtask.Task_name}</p>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              demote_task(
                                eachtask.Task_id,
                                eachtask.Task_state,
                                eachtask.Task_notes
                              )
                            }
                          >
                            Move Left
                          </button>

                          <button className="btn btn-primary btn-block">
                            View
                          </button>
                          <button
                            onClick={() =>
                              promote_task(
                                eachtask.Task_id,
                                eachtask.Task_state,
                                eachtask.Task_notes
                              )
                            }
                          >
                            Move Right
                          </button>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card card-border-success">
                <div className="card-header">
                  <div className="card-actions float-right"></div>
                  <h5 className="card-title">Close</h5>
                </div>
                <div className="rightinnerbodytask">
                  {showtask.map((eachtask) => {
                    if (eachtask.Task_state === "Close") {
                      return (
                        <div className="card-body">
                          <div className="card mb-3 bg-light">
                            <p className="card-right-title">
                              {eachtask.Task_owner}
                            </p>
                            <div className="card-body p-1">
                              <h6>Task Name:</h6>
                              <p>{eachtask.Task_name}</p>
                              <h6>Task Name:</h6>
                              <p>{eachtask.Task_name}</p>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Kaabanboard;
