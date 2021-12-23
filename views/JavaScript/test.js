class Test {
  constructor(
    subjectid,
    n1questions,
    n2questions,
    n3questions,
    dateopen,
    dateclose
  ) {
    this.subjectid = subjectid;
    this.n1questions = n1questions;
    this.n2questions = n2questions;
    this.n3questions = n3questions;
    this.dateopen = dateopen;
    this.dateclose = dateclose;
  }

  addtest() {
    console.log(this.subjectid);
    console.log(this.n1questions);
    console.log(this.n2questions);
    console.log(this.n3questions);
    console.log(this.dateopen);
    console.log(this.dateclose);
    console.log("test added");
  }

  deletetest() {
    console.log("test deleted");
  }

  gettests(){
    console.log("tests");
  }
}

function adding() {
  let subjectid = document.querySelector("#subjectid").value
  let n1 = document.querySelector("#n1").value
  let n2 = document.querySelector("#n2").value
  let n3 = document.querySelector("#n3").value
  let dateopen = document.querySelector("#dateopen").value
  let dateclose = document.querySelector("#dateclose").value
  return new Test(subjectid, n1, n2, n3, dateopen, dateclose).addtest()
}







