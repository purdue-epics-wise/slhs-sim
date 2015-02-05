function plotScore(score,co,ci) {
    $("#ss").animate({"left":score},1250);
    $("#sd").animate({"left":co,"width":ci},1250);
    return false;
}

window.onload=function() {
    document.getElementById('stdscore').onsubmit=function() {
        var score = document.getElementById('score').value;
        var ss = 640 - (100 - (((score >= 20) && (score <= 160)) ? score : 100)) * 6;
        var crb = document.getElementsByName('confint');
        var conf;
        var confint;
        var confoffset;
        for (var i = 0, length = crb.length; i < length; i++) {
            if (crb[i].checked) {
                conf = crb[i].value;
                confoffset = (conf == 90) ? (ss - 5 * 6) : (ss - 6 * 6);
                confint = (conf == 90) ? (11 * 6) : (13 * 6);
                break;
            }
        }
        //alert(ss);
        //alert(confoffset);
        plotScore(ss, confoffset, confint);
        return false;
    }
}
