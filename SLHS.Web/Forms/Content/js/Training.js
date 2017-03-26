var points = [5, 10, 15],
            index = 0,
            currentStopTime = points[index];

//asp make ID looks sucks
var questions = document.getElementById('BodyContentPlaceHolder1_quiz').getElementsByTagName('div');
function displayQuiz(index) {
    for (var i = 0; i < questions.length; i++) {
        questions[i].style.display = 'none';
    }
    if (index != -1) {
        questions[index].style.display = 'block';
    }
}

var video = document.getElementById('BodyContentPlaceHolder1_video');

function prev() {
    if (index > 0) {
        index--;
        displayQuiz(index);
    }
}

function next() {
    if (points.length > ++index) {
        currentStopTime = points[index];
        displayQuiz(-1);
        video.play();
    } else {
        alert("finished");
    }
}

video.addEventListener("timeupdate", function () {
    if (this.currentTime >= currentStopTime) {
        this.pause();
        this.currentTime = currentStopTime;
        displayQuiz(index);
    }
});
