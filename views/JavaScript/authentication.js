const register = async () => {
  const nickname = document.getElementById("nickname").value;
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
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "connect.sid=s%3AT_2dOwghZRQNJvUQ6DwNDGRSnOa3legZ.1YydrxtMRkH45XBDBSkXXPkO%2BGU%2B%2FTaedYld%2Bwerelk"
    );

    var raw = JSON.stringify({
      "nickname": nickname,
      "email": email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("http://localhost:5000/CheckAccount", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        (() => {
          if(result == true){
            const require = document.getElementById("Required");
            require.innerHTML = "Email or nickname already in use";
          }else{
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
              nickname: nickname,
              email: email,
              password: password,
            });

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            fetch("http://localhost:5000/CreateAccount", requestOptions)
              .then((response) => response.json())
              .then((result) => console.log(result))
              .catch((error) => console.log("error", error));
            window.location.href = "login";
          }
        })();
      })
      .catch((error) => console.log("error", error));
    }
  }



const login = () => {
  const nickname = document.getElementById("nickname").value;
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
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Cookie",
        "connect.sid=s%3AjVg7zdOITBnl_jX9AkNdkLrh-OcoEkTq.q98Z8Qt8fhg2ESoy%2BGuVh1CGKrfH1zvtCHf8d65cW1g"
      );
      var raw = JSON.stringify({
        nickname: nickname,
        password: password,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch("http://localhost:5000/auth", requestOptions)
        .then((response) => response.json())
        .then((result) => result)
        .catch((error) => console.log("error", error));
         window.location.href = "home";
    }
  }
};

const goregister = () => {
  window.location.href = "register";
};

const gologin = () => {
  window.location.href = "login";
}
