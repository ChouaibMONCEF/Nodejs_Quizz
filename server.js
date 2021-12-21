var mysql = require('mysql')
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var path = require('path')

var con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'nfa'
});

var app = express();

app.use(session({
    secret : 'secret',
    resave : true, 
    saveUninitialized : true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/views/login.html'))
})

app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/register.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/login.html"));
});

app.post('/auth', function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    if(email && password){
        con.query('SELECT * FROM mytable WHERE email = ? AND password = ?', [email , password], function(error, results, fields){
            if(results.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                res.redirect('/home')
            }else{
                res.send('Incorrect')
            }
            res.end()
        })
        
    }else{
        res.send('enter your infos')
        res.end()
    }
})

app.post("/CreateAccount", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  if (email && password && name) {
    con.query(
      "INSERT INTO mytable (name, email, password) values (?, ?, ?)",
      [name, email, password],
      function () {
          res.redirect("/login");
          res.end()
        },
    );
  } else {
    res.send("enter your infos");
    res.end();
  }
});

app.get('/home', function(req, res){
  res.sendFile(path.join(__dirname + "/views/home.html"));
    // if(req.session.loggedin){
    //     res.sendFile(path.join(__dirname + "/views/home.html"));
    // }else{
    //     res.send('Please Login to view this page')
    // }
    res.end()
})

app.listen(5000);