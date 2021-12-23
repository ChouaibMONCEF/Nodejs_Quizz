let wl = JSON.parse(localStorage.getItem("logged"))

document.getElementById("wl").innerHTML = wl.nickname;

let start = document.querySelector("#start");
if (localStorage.getItem("questions") == null) {
    start.innerHTML = "Start"
}else{
    let test = document.getElementById("btnn");
    let btn = document.createElement("button");
    btn.innerHTML = "Reset Game";
    btn.classList = "blue";
    btn.addEventListener(
      "click",
      function () {
        localStorage.removeItem("questions")
        localStorage.removeItem("points")
        localStorage.removeItem("score");
        location.reload()
      },
      { once: true }
    );
    start.innerHTML = "Continue";
    test.appendChild(btn);
}

