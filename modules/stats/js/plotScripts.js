function plotScore(score,co,ci) {
    $(".marker").fadeOut(300);
    $("#ss").delay(500).animate({"left":score},1250);
    $("#sd").delay(500).animate({"left":co,"width":ci},1250);
    $(".marker").delay(1400).fadeIn(500);
    return false;
}

window.onload=function() {
    document.getElementById('stdscore').onsubmit=function() {
        var score = document.getElementById('score').value;
        var ss = 604 - (100 - (((score >= 20) && (score <= 160)) ? score : 100)) * 5.67;
        var crb = document.getElementsByName('confint');
        var conf;
        var confint;
        var confoffset;
        for (var i = 0, length = crb.length; i < length; i++) {
            if (crb[i].checked) {
                conf = crb[i].value;
                confoffset = (conf == 90) ? (ss - 5 * 5.67) : (ss - 6 * 5.67);
                confint = (conf == 90) ? (11 * 5.67) : (13 * 5.67);
                break;
            }
        }
        //alert(ss);
        //alert(confoffset);
        plotScore(ss, confoffset, confint);
        return false;
    }
}
