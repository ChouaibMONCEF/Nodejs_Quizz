init();

async function init() {
  //fetch data from local JSON file
  var myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    "connect.sid=s%3A19ugCCAe8EvuFxa8qCACiQQwKJKx6xIz.f0lIrrcDj5tHKRmNa9qyeKZmUEr%2FwPeEf4ZkkF%2BBR6Y"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://localhost:5000/GetAnswers", requestOptions)
    .then((response) => response.json())
    .then((result) => (()=>{
      //Store all data in array of elements
      const AllData = result;
      console.log(AllData);
      //Generate 6 random questions from data 2 from each level and store it a new array of objects and if exists don't do it
      var GameData = [];
      if (localStorage.getItem("questions") == null) {
        function generate(n) {
          for (j = 0; j < 2; j++) {
            var random = Math.floor(Math.random() * AllData.length);
            var picked = AllData[random];
            if (GameData.includes(picked) || AllData[random].level !== n) {
              j--;
            } else {
              GameData.push(picked);
            }
          }
        }
        for (i = 1; i <= 3; i++) {
          generate(i);
        }
        console.log(GameData);
        localStorage.setItem("questions", JSON.stringify(GameData));
      }
      //get the data we stored in local storage
      let ra = JSON.parse(localStorage.getItem("questions"));
      let isval = [];
      //get the score and points
      let added = JSON.parse(localStorage.getItem("points"));
      let currentscore = JSON.parse(localStorage.getItem("score"));

      let index = isval.concat(added);
      //filter points from any null values
      var filtered = index.filter(function (el) {
        return el != null;
      });
      //objects where we used to score points and count 1 for right 0 for wrong and count 1s so we get the score
      const points = {};
      //function to count
      filtered.forEach(function (x) {
        points[x] = (points[x] || 0) + 1;
      });
      //We set the value here of the progress bar so it can increment each time we pass to another question
      let progress = document.querySelector("#file");
      progress.value = filtered.length;
      //we show score here if points is not set yet we set 0 if it already exists we set currentscore
      let score = document.querySelector("#score");
      if (points[1] === undefined) {
        score.innerHTML = "0";
      } else {
        score.innerHTML = currentscore;
      }
      //here we start by checking if we reached the last question first so we don't keep the continue
      if (filtered.length === 6) {
        //First we get the data of the user logged
        let wl = JSON.parse(localStorage.getItem("logged"));
        let id = wl.id;
        let ntries = wl.tries + 1;
        let nickname = wl.nickname;
        let password = wl.password;
        //then we count the percentage he got during the quizz
        let score = JSON.parse(localStorage.getItem("score"));
        let percentage = (100 * score) / 340;
        if (percentage > 69.999) {
          //if he got more than 70% the he succeed
          let scores = [
            {
              name: nickname,
              score: Math.floor(percentage),
            },
          ];

          let ohighscores = JSON.parse(localStorage.getItem("highscores"));
          if (localStorage.getItem("highscores") == null) {
            localStorage.setItem("highscores", JSON.stringify(scores));
          } else {
            let finalhs = ohighscores.concat(scores);
            localStorage.removeItem("highscores");
            localStorage.setItem("highscores", JSON.stringify(finalhs));
          }
          //update and ban user
          let remove = JSON.parse(localStorage.getItem("users"));
          const filteredusers = remove.filter((item) => item.id !== id);
          let newuser = {
            id: id,
            nickname: nickname,
            password: password,
            tries: ntries,
            rate: percentage,
            banned: true,
            success: true,
          };

          localStorage.removeItem("users");
          filteredusers.push(newuser);
          localStorage.setItem("users", JSON.stringify(filteredusers));
          let userss = JSON.parse(localStorage.getItem("users"));
          localStorage.removeItem("logged");
          for (var i = 0; i < userss.length; i++) {
            if (id == userss[i].id) {
              let logged = userss[i];
              localStorage.setItem("logged", JSON.stringify(logged));
              window.location.href = "end.html";
            }
          }
        } else {
          //if ge got less than 70% we check which try is this if he done 3 tries we ban him
          if (ntries > 3) {
            console.log("tdzdzdzssst");
            let remove = JSON.parse(localStorage.getItem("users"));
            const filteredusers = remove.filter((item) => item.id !== id);
            let newuser = {
              id: id,
              nickname: nickname,
              password: password,
              tries: ntries,
              rate: percentage,
              banned: true,
              success: false,
            };

            localStorage.removeItem("users");
            filteredusers.push(newuser);
            localStorage.setItem("users", JSON.stringify(filteredusers));

            let userss = JSON.parse(localStorage.getItem("users"));
            localStorage.removeItem("logged");
            for (var i = 0; i < userss.length; i++) {
              if (id == userss[i].id) {
                let logged = userss[i];
                localStorage.setItem("logged", JSON.stringify(logged));
              }
            }
          } else {
            console.log('tessssst');
            //if this isn't the third try we increment his tries
            let remove = JSON.parse(localStorage.getItem("users"));
            const filteredusers = remove.filter((item) => item.id !== id);
            let newuser = {
              id: id,
              nickname: nickname,
              password: password,
              tries: ntries,
              rate: percentage,
              banned: false,
              success: false,
            };

            localStorage.removeItem("users");
            filteredusers.push(newuser);
            localStorage.setItem("users", JSON.stringify(filteredusers));

            let userss = JSON.parse(localStorage.getItem("users"));
            localStorage.removeItem("logged");
            for (var i = 0; i < userss.length; i++) {
              if (id == userss[i].id) {
                let logged = userss[i];
                localStorage.setItem("logged", JSON.stringify(logged));
              }
            }
          }
        }
        localStorage.removeItem("points");
        localStorage.removeItem("questions");
        localStorage.removeItem("score");
        window.location.href = "home";
      } else {
        //if the user hasn't reach the last question yet we check the question's type first
        if (ra[filtered.length].type == 0) {
          // console.log(ra[1].answers.split(","));
          let newra = ra[filtered.length].answers.split(",");
          //question type 0 means that multiple choice question
          for (let i = 0; i < newra.length; i++) {
            //first we print the questions and set the buttons with id for each button
            let question = document.getElementById("question");
            question.innerHTML = ra[filtered.length].question;
            let test = document.getElementById("answer");
            let btn = document.createElement("button");
            btn.innerHTML = newra[i];
            btn.classList = "answer";
            btn.setAttribute("id", "sarl"[i]);
            test.appendChild(btn);
            if (i == ra[filtered.length].correct) {
              //we check if that is the correct answer's button so we give it a diffrent eventListener onclick
              btn.addEventListener(
                "click",
                function () {
                  //here is the correct we give it class first and then we incerement score and points and stop the chrono adn finally a timout for 1 second
                  btn.classList = "correct";
                  let history = JSON.parse(localStorage.getItem("history"));
                  let addHistory = [
                    {
                      question: ra[filtered.length].question,
                      correct: true,
                      hint: ra[filtered.length].hint,
                    },
                  ];

                  if (history == null) {
                    localStorage.setItem("history", JSON.stringify(addHistory));
                  } else {
                    let newHistory = history.concat(addHistory);
                    localStorage.setItem("history", JSON.stringify(newHistory));
                  }
                  let points = ra[filtered.length].points;
                  let savedpoints = JSON.parse(localStorage.getItem("score"));
                  let finalpoints;
                  if (savedpoints == null) {
                    finalpoints = points;
                  } else {
                    finalpoints = points + savedpoints;
                  }
                  console.log(finalpoints);
                  localStorage.removeItem("score");
                  localStorage.setItem("score", JSON.stringify(finalpoints));
                  let add = [1];
                  let lcs = filtered.concat(add);
                  localStorage.removeItem("points");
                  clearTimeout(counter);
                  localStorage.setItem("points", JSON.stringify(lcs));
                  setTimeout(function () {
                    location.reload();
                  }, 1000);
                },
                { once: true }
              );
            } else {
              //here we set another event listener so button can turns red and we only increment points so we can go to the next questions not the score
              btn.addEventListener(
                "click",
                function () {
                  btn.classList = "wrong";
                  let history = JSON.parse(localStorage.getItem("history"));
                  let addHistory = [
                    {
                      question: ra[filtered.length].question,
                      correct: false,
                      hint: ra[filtered.length].hint,
                    },
                  ];

                  if (history == null) {
                    localStorage.setItem("history", JSON.stringify(addHistory));
                  } else {
                    let newHistory = history.concat(addHistory);
                    localStorage.setItem("history", JSON.stringify(newHistory));
                  }
                  let add = [0];
                  let lcs = filtered.concat(add);
                  localStorage.removeItem("points");
                  clearTimeout(counter);
                  localStorage.setItem("points", JSON.stringify(lcs));
                  setTimeout(function () {
                    location.reload();
                  }, 1000);
                },
                { once: true }
              );
            }
          }
        } else {
          let newra = ra[filtered.length].answers.split(",");
          //here we go if the questions isn't a multiple choice question so user should type the answer we appent input and button this time
          let question = document.getElementById("question");
          question.innerHTML = ra[filtered.length].question;
          let test = document.getElementById("answer");
          let inpt = document.createElement("input");
          let btn = document.createElement("button");
          btn.innerHTML = newra[i];
          btn.classList = "bot";
          btn.innerHTML = "submit";
          test.appendChild(inpt);
          inpt.setAttribute("id", "answerid");
          test.appendChild(btn);
          //at click we compare the typed answer in the input with the existing answer if it match it we increment socre and points else we increment only the points
          btn.addEventListener(
            "click",
            function () {
              if (
                newra[0] ==
                document.getElementById("answerid").value.toUpperCase()
              ) {
                btn.classList = "botcor";
                let history = JSON.parse(localStorage.getItem("history"));
                let addHistory = [
                  {
                    question: ra[filtered.length].question,
                    correct: true,
                    hint: ra[filtered.length].hint,
                  },
                ];

                if (history == null) {
                  localStorage.setItem("history", JSON.stringify(addHistory));
                } else {
                  let newHistory = history.concat(addHistory);
                  localStorage.setItem("history", JSON.stringify(newHistory));
                }
                let points = ra[filtered.length].points;
                let savedpoints = JSON.parse(localStorage.getItem("score"));
                let finalpoints;
                if (savedpoints == null) {
                  finalpoints = points;
                } else {
                  finalpoints = points + savedpoints;
                }
                console.log(finalpoints);
                localStorage.removeItem("score");
                localStorage.setItem("score", JSON.stringify(finalpoints));
                let add = [1];
                let lcs = filtered.concat(add);
                localStorage.removeItem("points");
                clearTimeout(counter);
                localStorage.setItem("points", JSON.stringify(lcs));
              } else {
                btn.classList = "botwro";
                let history = JSON.parse(localStorage.getItem("history"));
                let addHistory = [
                  {
                    question: ra[filtered.length].question,
                    correct: false,
                    hint: ra[filtered.length].hint,
                  },
                ];

                if (history == null) {
                  localStorage.setItem("history", JSON.stringify(addHistory));
                } else {
                  let newHistory = history.concat(addHistory);
                  localStorage.setItem("history", JSON.stringify(newHistory));
                }
                let add = [0];
                let lcs = filtered.concat(add);
                localStorage.removeItem("points");
                clearTimeout(counter);
                localStorage.setItem("points", JSON.stringify(lcs));
              }
              setTimeout(function () {
                location.reload();
              }, 1000);
            },
            { once: true }
          );
        }
      }
      //I added if so i can check if this we reached the end of the quizz so it stops else it works and it gets faster and at the end it consider his answer is wrong and move to another question
      if (filtered.length !== 6) {
        var count = 0;
        var ms = 300;
        var step = 5;
        var counter = setTimeout(timer, ms);
        function timer() {
          count = count + 1;
          if (count <= 30) {
            document.getElementById("bar").value = count;
            ms = ms - step;
            counter = setTimeout(timer, ms);
            if (count == 30) {
              let add = [0];
              let lcs = filtered.concat(add);
              localStorage.removeItem("points");
              clearTimeout(counter);
              localStorage.setItem("points", JSON.stringify(lcs));
              setTimeout(function () {
                location.reload();
              }, 100);
            }
          }
        }
      }
    })())
    .catch((error) => console.log("error", error));
  
}