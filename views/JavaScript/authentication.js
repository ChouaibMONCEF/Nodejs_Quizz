const register = () => {
  const nickname = document.getElementById("nickname").value.toUpperCase();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (
    password == null ||
    password == "" ||
    nickname == null ||
    nickname == "" ||
    email == null ||
    email == ""
  ) {
    const required = document.getElementById("Required");
    required.innerHTML = "Fill all fields";
  } else {

    var myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      "connect.sid=s%3AT_2dOwghZRQNJvUQ6DwNDGRSnOa3legZ.1YydrxtMRkH45XBDBSkXXPkO%2BGU%2B%2FTaedYld%2Bwerelk"
    );

    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let data = fetch("http://localhost:5000/AllAccounts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => console.log("error", error));
    
      console.log(data);
      debugger

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // var raw = JSON.stringify({
    //   "nickname": nickname,
    //   "email": email,
    //   "password": password
    // });

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };

    // fetch("http://localhost:5000/CreateAccount", requestOptions)
    //   .then(response => response.text())
    //   .then(result => {return result})
    //   .catch(error => console.log('error', error));
    //       window.location.href = "login";
    // }
    //  else {
    //   //check if nickname already exists
    //   let userss = JSON.parse(localStorage.getItem("users"));

    //   function userExists(name) {
    //     return userss.some(function (el) {
    //       return el.nickname === nickname;
    //     });
    //   }
    //   //then push it in as an object
      // if (userExists(nickname) === true) {
      //   document.getElementById("Required").innerHTML =
      //     "Nickname not available";
      // } else {
      //   let newuser = {
      //     id: userss.length + 1,
      //     nickname: nickname,
      //     password: password,
      //     tries: 0,
      //     rate: 0,
      //     banned: false,
      //     success: false,
      //   };
      //   localStorage.removeItem("users");
      //   userss.push(newuser);
      //   localStorage.setItem("users", JSON.stringify(userss));
      //   window.location.href = "login";
      // }
    }



const login = () => {
  const nickname = document.getElementById("nickname").value.toUpperCase();
  const password = document.getElementById("password").value;
  if (
    password == null ||
    password == "" ||
    nickname == null ||
    nickname == ""
  ) {
    document.getElementById("Required").innerHTML = "Fill all fields";
  } else {
    if (localStorage.getItem("users") == null) {
      document.getElementById("Required").innerHTML = "create account first";
    } else {
      //validate the authentication
      let userss = JSON.parse(localStorage.getItem("users"));
      for (var i = 0; i < userss.length; i++) {
        if (nickname == userss[i].nickname) {
          if (password == userss[i].password) {
            let logged = userss[i];
            localStorage.setItem("logged", JSON.stringify(logged));
            window.location.href = "index";
          } else {
            document.getElementById("Required").innerHTML =
              "wrong password";
          }
        }
      }
    }
  }
};

const goregister = () => {
  window.location.href = "register";
};

const gologin = () => {
  window.location.href = "login";
};
