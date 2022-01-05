class Test {
  constructor(
    subjectid,
    n1questions,
    n2questions,
    n3questions,
    percentage
  ) {
    this.subjectid = subjectid;
    this.n1questions = n1questions;
    this.n2questions = n2questions;
    this.n3questions = n3questions;
    this.percentage = percentage;

  }

  addtest() {
    // console.log(this.subjectid);
    // console.log(this.n1questions);
    // console.log(this.n2questions);
    // console.log(this.n3questions);
    // console.log(this.percentage);
    // console.log("test added");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "connect.sid=s%3APyCNQ5jh4cUNzHqYXbrfFCLRe2ZOxob-.Vymuo%2BMIjt6f139OQfmDUcvYbQIJKtJtZBJM03jwbrY"
    );

    var raw = JSON.stringify({
      title: "Test1",
      subjectid: this.subjectid,
      easy_number: this.n1questions,
      medium_number: this.n2questions,
      hard_number: this.n3questions,
      success_percentage: this.percentage
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/AddingTest", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
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
  let percentage = document.querySelector("#percentage").value
  
  return new Test(subjectid, n1, n2, n3, percentage).addtest()
}







