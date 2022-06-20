const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "testing",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "kaaban",
});

//test connection into database
db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});

//sign up function
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  // const usergroup = "Member";

  bcrypt.hash(password, 10).then((hash) => {
    db.query(
      "INSERT INTO accounts (username,password,email) VALUES (?,?,?)",
      [username, hash, email],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send("values inserted");
        }
      }
    );
  });
});

//login function
app.get("/login", (req, res) => {
  console.log(req.session.user);
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM accounts WHERE username=?",
    [username],
    async (err, results) => {
      if (results[0].status === "Disable") {
        res.send({ message: "Disable" });
      } else {
        if (err) {
          console.log(err);
        }
        if (results.length > 0) {
          await bcrypt.compare(
            password,
            results[0].password,
            (err, response) => {
              if (response) {
                req.session.user = results;
                res.send(results);
              } else {
                res.send({ message: "Wrong username/password" });
              }
            }
          );
        } else {
          res.send({ message: "User does not exist" });
        }
      }
    }
  );
});

//list all the user
app.get("/showall", function (req, res) {
  db.query("SELECT * FROM accounts", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

//get one user
app.post("/showone", function (req, res) {
  const username = req.body.username;
  db.query(
    "SELECT * FROM accounts WHERE username=?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

// edit the user password
app.post("/update", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (password) {
    bcrypt.hash(password, 10).then((hash) => {
      db.query(
        "UPDATE accounts SET password=? WHERE username=?",
        [hash, username],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            res.send("Done");
          }
        }
      );
    });
  }
  if (email) {
    db.query(
      "UPDATE accounts SET email=? WHERE username=?",
      [email, username],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send("Done");
        }
      }
    );
  }
});

//disable
app.post("/disable", function (req, res) {
  const username = req.body.username;
  const status = req.body.status;
  db.query(
    "UPDATE accounts SET status=? WHERE username=?",
    [status, username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Done");
      }
    }
  );
});

//create user group
app.post("/createusergroup", function (req, res) {
  const usergroup_name = req.body.usergroup_name;
  db.query(
    "INSERT INTO usergroup (usergroup_name) VALUES (?)",
    [usergroup_name],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

//list usergroup
app.get("/showusergroup", function (req, res) {
  db.query("SELECT * FROM usergroup", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//add user to usergroup
app.post("/addusergroup", function (req, res) {
  const usergroup = req.body.usergroup;
  const username = req.body.username;
  db.query(
    "SELECT usergroup FROM accounts WHERE username=?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result[0].usergroup === null) {
        db.query(
          "UPDATE accounts SET usergroup=? WHERE username=?",
          [usergroup, username],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
      } else if (result[0].usergroup.includes(usergroup) === true) {
        res.send({ dup: "User Group has been in the User Group" });
      } else {
        const newusergroup = result[0].usergroup + "," + usergroup;
        db.query(
          "UPDATE accounts SET usergroup=? WHERE username=?",
          [newusergroup, username],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
      }
    }
  );
});

//disable group
app.post("/disablegroup", function (req, res) {
  const usergroup = req.body.usergroup_name;
  let status = req.body.usergroup_status;
  if (status === "Enable") {
    status = "Disable";
  } else {
    status = "Enable";
  }
  db.query(
    "UPDATE usergroup SET usergroup_status=? WHERE usergroup_name=?",
    [status, usergroup],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Done");
      }
    }
  );
});

//remove from group
app.post("/removeusergroup", function (req, res) {
  const usergroup = req.body.usergroup;
  const username = req.body.username;
  db.query(
    "SELECT usergroup FROM accounts WHERE username=?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result[0].usergroup === null) {
          res.send({ nouser: "No User Group to be remove" });
        } else if (result[0].usergroup === usergroup) {
          onlyone_usergroup = null;
          db.query(
            "UPDATE accounts SET usergroup=? WHERE username=?",
            [onlyone_usergroup, username],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send({ message: "User Group has been removed" });
              }
            }
          );
        } else {
          array_usergroup = result[0].usergroup.split(",");
          new_array_usergroup = array_usergroup.filter(
            (group) => group != usergroup
          );
          join_new_array_usergroup = new_array_usergroup.join(",");

          db.query(
            "UPDATE accounts SET usergroup=? WHERE username=?",
            [join_new_array_usergroup, username],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send({ message: "User Group has been removed" });
              }
            }
          );
        }
      }
    }
  );
});

//checkgroup
app.post("/checkgroup", function (req, res) {
  const username = req.body.username;
  db.query(
    "SELECT usergroup FROM accounts WHERE username=?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result[0].usergroup);
      if (result[0].usergroup === null) {
        res.send({ isAdmin: false });
      } else if (result[0].usergroup.includes("Admin")) {
        res.send({ isAdmin: true });
      } else {
        res.send({ isAdmin: false });
      }
    }
  );
});

//create application
app.post("/create_application", function (req, res) {
  const app_acronym = req.body.app_acronym;
  const app_rnumber = req.body.app_rnumber;
  const app_description = req.body.app_description;
  const app_start_date = req.body.app_start_date;
  const app_end_date = req.body.app_end_date;

  db.query(
    "INSERT INTO application (App_Acronym,App_Rnumber,App_Description,App_startDate,App_endDate) VALUES (?,?,?,?,?)",
    [app_acronym, app_rnumber, app_description, app_start_date, app_end_date],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send("application values inserted");
      }
    }
  );
});

//show all application
app.get("/showallapplication", function (req, res) {
  db.query("SELECT * FROM application", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//create plan
app.post("/create_plan", function (req, res) {
  const plan_mvp_name = req.body.plan_mvp_name;
  const plan_start_date = req.body.plan_start_date;
  const plan_end_date = req.body.plan_end_date;
  const plan_app_acronym = req.body.plan_app_Acronym;

  db.query(
    "INSERT INTO plan (Plan_MVP_name,Plan_startDate,Plan_endDate,Plan_app_Acronym) VALUES (?,?,?,?)",
    [plan_mvp_name, plan_start_date, plan_end_date, plan_app_acronym],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send("application values inserted");
      }
    }
  );
});

//show all plan link to project
app.get("/showplan", function (req, res) {
  db.query("SELECT * FROM plan", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Hi,I am running!");
});
