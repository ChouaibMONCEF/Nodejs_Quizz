var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var app = express();
app.use(express.static(__dirname + "/views"));
app.set("views", __dirname + "/views/Pages");
app.set("view engine", "ejs");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nfa",
});

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/auth", function (req, res) {
  var nickname = req.body.nickname;
  var password = req.body.password;
  if (nickname && password) {
    con.query(
      "SELECT * FROM mytable WHERE nickname = ? AND password = ?",
      [nickname, password],
      function (error, results, fields) {
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.nickname = nickname;
          res.redirect("/home");
        } else {
          res.redirect("/login");
        }
        res.end();
      }
    );
  } else {
    res.redirect("/login");
    res.end();
  }
});

app.post("/CreateAccount", function (req, res) {
  var nickname = req.body.nickname;
  var email = req.body.email;
  var password = req.body.password;
  if (email && password && nickname) {
    con.query(
      "INSERT INTO mytable (nickname, email, password) values (?, ?, ?)",
      [nickname, email, password],
      function () {
        res.redirect("/login");
        res.end();
      }
    );
  } else {
    res.send("enter your infos");
    res.end();
  }
});

app.post("/AddQuestion", function (req, res) {
  var question = req.body.question;
  var answers = req.body.answers;
  var correct = req.body.correct;
  var points = req.body.points;
  var level = req.body.level;
  var type = req.body.type;
  var hint = req.body.hint;
  var testid = req.body.testid;
  if (
    question &&
    answers &&
    correct &&
    points &&
    level &&
    type &&
    hint &&
    testid
  ) {
    con.query(
      "INSERT INTO questions (question, answers, correct, points, level, type, hint, testid) values (?, ?, ?, ?, ?, ?, ?, ?)",
      [question, answers, correct, points, level, type, hint, testid],
      function () {
        res.redirect("/formateur");
        res.end();
      }
    );
  } else {
    res.send("enter your infos");
    res.end();
  }
});

app.post("/AddTest", function (req, res) {
  var title = req.body.title;
  var subjectid = req.body.subjectid;
  var easy_number = req.body.easy_number;
  var medium_number = req.body.medium_number;
  var hard_number = req.body.hard_number;
  var success_percentage = req.body.success_percentage;
  if (
    title &&
    subjectid &&
    easy_number &&
    medium_number &&
    hard_number &&
    success_percentage
  ) {
    con.query(
      "INSERT INTO tests (title, subjectid, easy_number, medium_number, hard_number, success_percentage) values (?, ?, ?, ?, ?, ?)",
      [
        title,
        subjectid,
        easy_number,
        medium_number,
        hard_number,
        success_percentage,
      ],
      function () {
        res.redirect("/formateur");
        res.end();
      }
    );
  } else {
    res.send("enter your infos");
    res.end();
  }
});

app.post("/AddSubject", function (req, res) {
  var title = req.body.title;
  if (title) {
    con.query("INSERT INTO subjects (title) values (?)", [title], function () {
      res.redirect("/formateur");
      res.end();
    });
  } else {
    res.send("enter your infos");
    res.end();
  }
});

app.post("/CheckAccount", function (req, res) {
  var nickname = req.body.nickname;
  var email = req.body.email;
  console.log(req.body);
  con.query(
    "SELECT * FROM mytable WHERE nickname = ? OR email = ?",
    [nickname, email],
    function (err, recordset) {
      if (err) throw err;
      if (recordset == 0) {
        res.send(false);
      } else {
        res.send(true);
      }
    }
  );
});

app.get("/GetAnswers", function (req, res) {
  con.query(
    "SELECT * FROM questions",
    function (err, recordset) {
      if (err) throw err;
      if (recordset == 0) {
        res.send(false);
      } else {
        res.send(recordset);
      }
    }
  );
});

app.get("/home", function (req, res) {
  if (req.session.loggedin) {
    res.render("index");
  } else {
    res.redirect("/login");
  }
  res.end();
});

app.get("/quizz", function (req, res) {
  if (req.session.loggedin) {
    res.render("quizz");
  } else {
    res.redirect("/login");
  }
  res.end();
});

app.listen(5000);
