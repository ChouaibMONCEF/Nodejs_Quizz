let check = JSON.parse(localStorage.getItem("logged"));

let ifbanned = check.banned
let ifsucceeded = check.success

if (ifbanned == true && ifsucceeded == false) {
  document.getElementById('start').disabled = true 
  document.getElementById("lw").classList = "fail"
  document.getElementById("lw").innerHTML = "Failed"
}else if(ifbanned == true && ifsucceeded == true) {
  document.getElementById('start').disabled = true 
  document.getElementById("lw").classList = "suc"
  document.getElementById("lw").innerHTML = "success"
}
