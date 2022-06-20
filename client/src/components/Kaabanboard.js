import React from "react";
import { Link, useParams } from "react-router-dom";

function Kaabanboard() {
  //   const current = new Date();
  //   const date = `${current.getFullYear()}/${
  //     current.getMonth() + 1
  //   }/${current.getDate()}`;
  const app_acronym = useParams();

  return (
    <main class="flex-container">
      <div class="leftcontainer col-3">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <div class="card-actions float-right">
                <Link to={`/create-plan/${app_acronym.appname}`}>
                  <button>Create Plan</button>
                </Link>
              </div>
              <h1 class="card-title">Plan</h1>
            </div>
            <div class="card-body p-3">
              <div class="card bg-light">
                <div class="card-body p-3">
                  <p>
                    Curabitur ligula sapien, tincidunt non, euismod vitae,
                    posuere imperdiet, leo. Maecenas malesuada.
                  </p>

                  <button class="btn btn-outline-primary btn-sm">View</button>
                </div>
              </div>

              <button class="btn btn-primary btn-block">Add new</button>
            </div>
          </div>
        </div>
      </div>
      <div class="testcontainer">
        <div class="rightcontainer p-0">
          <h1 class="h3 mb-3">Kanban Board</h1>
          <div class="row">
            <div class="col">
              <div class="card card-border-primary">
                <div class="card-header">
                  <div class="card-actions float-right"></div>
                  <h5 class="card-title">Open</h5>
                </div>
                <div class="card-body p-3">
                  <div class="card mb-3 bg-light">
                    <div class="card-body p-3">
                      <p>
                        Curabitur ligula sapien, tincidunt non, euismod vitae,
                        posuere imperdiet, leo. Maecenas malesuada.
                      </p>

                      <button class="btn btn-outline-primary btn-sm">
                        View
                      </button>
                    </div>
                  </div>

                  <button class="btn btn-primary btn-block">Add new</button>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card card-border-warning">
                <div class="card-header">
                  <div class="card-actions float-right"></div>
                  <h5 class="card-title">To-do-list</h5>
                </div>
                <div class="card-body">
                  <div class="card mb-3 bg-light">
                    <div class="card-body p-3">
                      <p>
                        Curabitur ligula sapien, tincidunt non, euismod vitae,
                        posuere imperdiet, leo. Maecenas malesuada.
                      </p>
                      <div class="float-right mt-n1"></div>
                      <button class="btn btn-outline-primary btn-sm">
                        View
                      </button>
                    </div>
                  </div>

                  <button class="btn btn-primary btn-block">Add new</button>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card card-border-danger">
                <div class="card-header">
                  <div class="card-actions float-right"></div>
                  <h5 class="card-title">Doing</h5>
                </div>
                <div class="card-body">
                  <div class="card mb-3 bg-light">
                    <div class="card-body p-3">
                      <p>
                        In hac habitasse platea dictumst. Curabitur at lacus ac
                        velit ornare lobortis. Curabitur a felis tristique.
                      </p>
                      <div class="float-right mt-n1"></div>
                    </div>
                  </div>

                  <button class="btn btn-primary btn-block">Add new</button>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card card-border-danger">
                <div class="card-header">
                  <div class="card-actions float-right"></div>
                  <h5 class="card-title">Done</h5>
                </div>
                <div class="card-body">
                  <div class="card mb-3 bg-light">
                    <div class="card-body p-3">
                      <p>
                        In hac habitasse platea dictumst. Curabitur at lacus ac
                        velit ornare lobortis. Curabitur a felis tristique.
                      </p>
                      <div class="float-right mt-n1"></div>
                    </div>
                  </div>

                  <button class="btn btn-primary btn-block">Add new</button>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card card-border-success">
                <div class="card-header">
                  <div class="card-actions float-right"></div>
                  <h5 class="card-title">Close</h5>
                </div>
                <div class="card-body">
                  <div class="card mb-3 bg-light">
                    <div class="card-body p-3">
                      <p>
                        Nam pretium turpis et arcu. Duis arcu tortor, suscipit
                        eget, imperdiet nec, imperdiet iaculis, ipsum.
                      </p>
                      <div class="float-right mt-n1"></div>
                    </div>
                  </div>

                  <button class="btn btn-primary btn-block">Add new</button>
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
