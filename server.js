var mysql = require('mysql')
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var app = express();
app.use(express.static(__dirname + "/views"));
app.set('views', __dirname + '/views/Pages')
app.set('view engine', 'ejs')

var con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'nfa'
});



app.use(session({
    secret : 'secret',
    resave : true, 
    saveUninitialized : true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.render('login')
})

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post('/auth', function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    if(email && password){
        con.query('SELECT * FROM mytable WHERE email = ? AND password = ?', [email , password], function(error, results, fields){
            if(results.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                res.redirect("/home");
            }else{ 
                res.redirect("/login");
            }
            res.end()
        })
        
    }else{
        res.redirect("/login");
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

app.get("/AllAccounts", function (req, res) {
    con.query(
      "SELECT * FROM mytable",
      function (err, recordset) {
        if (err) console.log(err);
        res.send(recordset)
      }
    );
});

app.get('/home', function(req, res){
  
    if(req.session.loggedin){
      res.render("home");
       console.log('welcome');
    }else{
        res.redirect("/login");
    }
    res.end()
})

app.listen(5000);