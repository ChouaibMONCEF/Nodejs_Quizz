let data = JSON.parse(localStorage.getItem("highscores"))

for (let i = 0; i < data.length; i++) {
  let namee = document.getElementById("namee");
  let intext1 = document.createElement("h2");
  intext1.setAttribute("id", "azertyuiop"[i]);
  let scoree = document.getElementById("scoree");
  let intext2 = document.createElement("h2");
  intext2.setAttribute("id", "qsdfghjklm"[i]);

  namee.appendChild(intext1);
  scoree.appendChild(intext2);

  let name = document.getElementById("azertyuiop"[i]);
  name.innerHTML = data[i].name;
  let score = document.getElementById("qsdfghjklm"[i]);
  score.innerHTML = data[i].score;
}
    