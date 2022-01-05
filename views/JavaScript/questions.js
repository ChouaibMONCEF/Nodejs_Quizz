class Question {
  constructor(question, subjectid, answers, correct, points, level) {
    this.question = question;
    this.subjectid = subjectid;
    this.answers = answers;
    this.correct = correct;
    this.points = points;
    this.level = level;

  }

  async addQuestion() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Cookie",
        "connect.sid=s%3Aw0WltPNxyUWNxi13_uahT2zbFQrVONIh.mXe3OJlNG%2FN3xNGOLqXAGK4PeRTlhHlNGQe5FQyJy1g"
      );

      var raw = JSON.stringify({
        question: this.question,
        level: this.level,
        subjectid: this.subjectid,
        answers: this.answers,
        correct: this.correct,
        points: this.points
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("http://localhost:5000/AddingQuestion", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

        window.location.href = "formateur";
  }
}

    function adding(){
        let question = document.getElementById("question").value
        let subject = document.getElementById("subject").value
        let answer1 = document.querySelector("#e").getAttribute("value")
        let answer2 = document.querySelector("#z").getAttribute("value")
        let answer3 = document.querySelector("#a").getAttribute("value")
        let answer4 = document.querySelector("#r").getAttribute("value")

        let answers =  [answer1, answer2, answer3, answer4]
        let points = document.getElementById("points").value
        let level = document.getElementById("level").value
  
        return new Question(question, subject, answers, correct, points, level).addQuestion()
    }
