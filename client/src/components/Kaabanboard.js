import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

function Kaabanboard() {
  //   const current = new Date();
  //   const date = `${current.getFullYear()}/${
  //     current.getMonth() + 1
  //   }/${current.getDate()}`;
  const app_acronym = useParams();
  const acronym_name = app_acronym.appname.toString();
  console.log(acronym_name);
  const [showplan, setShowplan] = useState([]);

  const showallplan = async () => {
    await axios
      .post("/showplan", { acronym_name: acronym_name })
      .then((response) => {
        console.log(response.data);
        setShowplan(response.data);
      });
  };

  useEffect(() => {
    showallplan(); // eslint-disable-next-line
  }, []);

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
                <div className="card-body p-3">
                  <div className="card mb-3 bg-light">
                    <div className="card-body p-3">
                      <p>
                        Curabitur ligula sapien, tincidunt non, euismod vitae,
                        posuere imperdiet, leo. Maecenas malesuada.
                      </p>

                      <button className="btn btn-outline-primary btn-sm">
                        View
                      </button>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-block">Add new</button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card-border-warning">
                <div className="card-header">
                  <div className="card-actions float-right"></div>
                  <h5 className="card-title">To-do-list</h5>
                </div>
                <div className="card-body">
                  <div className="card mb-3 bg-light">
                    <div className="card-body p-3">
                      <p>
                        Curabitur ligula sapien, tincidunt non, euismod vitae,
                        posuere imperdiet, leo. Maecenas malesuada.
                      </p>
                      <div className="float-right mt-n1"></div>
                      <button className="btn btn-outline-primary btn-sm">
                        View
                      </button>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-block">Add new</button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card-border-danger">
                <div className="card-header">
                  <div className="card-actions float-right"></div>
                  <h5 className="card-title">Doing</h5>
                </div>
                <div className="card-body">
                  <div className="card mb-3 bg-light">
                    <div className="card-body p-3">
                      <p>
                        In hac habitasse platea dictumst. Curabitur at lacus ac
                        velit ornare lobortis. Curabitur a felis tristique.
                      </p>
                      <div className="float-right mt-n1"></div>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-block">Add new</button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card-border-danger">
                <div className="card-header">
                  <div className="card-actions float-right"></div>
                  <h5 className="card-title">Done</h5>
                </div>
                <div className="card-body">
                  <div className="card mb-3 bg-light">
                    <div className="card-body p-3">
                      <p>
                        In hac habitasse platea dictumst. Curabitur at lacus ac
                        velit ornare lobortis. Curabitur a felis tristique.
                      </p>
                      <div className="float-right mt-n1"></div>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-block">Add new</button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card-border-success">
                <div className="card-header">
                  <div className="card-actions float-right"></div>
                  <h5 className="card-title">Close</h5>
                </div>
                <div className="card-body">
                  <div className="card mb-3 bg-light">
                    <div className="card-body p-3">
                      <p>
                        Nam pretium turpis et arcu. Duis arcu tortor, suscipit
                        eget, imperdiet nec, imperdiet iaculis, ipsum.
                      </p>
                      <div className="float-right mt-n1"></div>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-block">Add new</button>
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
