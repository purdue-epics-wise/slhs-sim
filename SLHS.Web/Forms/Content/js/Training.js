
document.getElementById('video').addEventListener('ended', videoHandler, false);

function videoHandler(e) {
    document.getElementById('quiz').style.display = "block";
}
