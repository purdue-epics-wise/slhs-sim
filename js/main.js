var setNumber = 0;
//[(0=a 1=b),(once yes, store startitem here),(number of "not readies")
var pretestProg = [0,"startitem",0];
var studentSetProg = [];
var gplayer = null;

function loadVideo(videoEmbeddedUrl) {
    document.getElementById("content-container").innerHTML='<center><iframe width="960" height="720" src="http://' + videoEmbeddedUrl + '" frameborder="0" allowfullscreen></iframe></center>';
}

function loadLocalVideo(videoFile){
    //collapses jumbotron to change video, then expands with new content
    $(".jumbotron").animate({height:"50px"},750,function() {
        if (gplayer !== null) {
            videojs("mainPlayer").dispose();
        }
        $("#content-container").html('<video id="mainPlayer" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="960" height="720"></video>');
        $("#mainPlayer").html('<source src="'+ videoFile + '.mp4" type=\'video/mp4\' > <track label="English" kind="subtitles" srclang="en" src="' + videoFile + '.vtt" default>');
        
        gplayer = videojs("mainPlayer", {
            bigPlayButton: false,
            controlBar: {
                playToggle: false,
                progressControl: {seekBar: false}
            }
        }, function() {
            pauseSet();
        });
        $(this).animate({height:"768px"},2000);
    });
    //bootstrap is really ****ing stupid
    $(".navbar").animate({height:"96px"},750,function() {
        $(this).animate({height:"48px"},1500);
    });
}

function videoSet(setNum){
    var duration = gplayer.duration();
    var timeStamp = 0;
    if (setNum > 0) {
        timeStamp = duration / 12 * setNum;
    }
    gplayer.currentTime(timeStamp);
    gplayer.play();
}

function pauseSet(){
    document.getElementById("mainPlayer_html5_api").addEventListener('timeupdate', function() {
	//console.log("Current Time: " + player.currentTime());        
	if (gplayer.currentTime() >= (setNumber + 1) * gplayer.duration() / 12) {
	    gplayer.pause();
            //need to insert a handler here to decide which function to call at each pause
            $("#studentProgress").animate({"left":"20px"}, 500);
	}
    });
}



/*function getFormData() {

    var formData = [];

    for (var f = 0; f < 12; f++) {

        var currentFormData = [];
        var currentF = (f + 1);

        for (var i = 0; i < 12; i++) {
            var currentI = (i + 1);
            var questionID = "s" + currentF + "q" + currentI;

            var answer = $('input[name="'+ questionID +'"]:checked').val();
            var isError = $("#"+ questionID +"-error").is(":checked");

            currentFormData[currentFormData.length] = {
                Answer: answer,
                Error: isError
            }
        }

        formData[formData.length] = currentFormData;
    }

    return formData;
}

function insertForms() {

    for (var f = 0; f < 12; f++) {

        var currentF = (f + 1);
        var setDiv = "#set" + currentF;
        var setDivContent = setDiv + "-form-content";

        var markupHeader = "<form class='form-horizontal'>" +
            "<fieldset>" +
            "<legend>Set " + currentF + "</legend>" +
            "<div id='set"+ currentF +"-form-content' class='form-group'>" +
            "<label class='col-md-1' for='q1'> </label>";

        $.template("formHeader", markupHeader);
        $.tmpl("formHeader").appendTo(setDiv);


        var markupFormHeaderData = [
            { Label: "1" },
            { Label: "2" },
            { Label: "3" },
            { Label: "4" },
            { Label: "E" }
        ];
        var markupFormHeader = "<label class='col-md-2 clab' for='q1'>${Label}</label>";

        $.template("formTemplateHeader", markupFormHeader);
        $.tmpl("formTemplateHeader", markupFormHeaderData).appendTo(setDivContent);


        var markupFormContentData = [];
        for (var i = 0; i < 12; i++) {
            var currentI = (i + 1);
            markupFormContentData[i] = {
                questionNumber: currentI,
                questionId: "s" + currentF + "q" + currentI,
                questionIdRadio1: "s" + currentF + "q" + currentI + "-1",
                questionIdRadio2: "s" + currentF + "q" + currentI + "-2",
                questionIdRadio3: "s" + currentF + "q" + currentI + "-3",
                questionIdRadio4: "s" + currentF + "q" + currentI + "-4",
                questionIdError: "s" + currentF + "q" + currentI + "-error"
            };
        }
        var markupFormContent = "<label class='col-md-1' for='${questionID}'>${questionNumber}.</label>" +
            "<label class='col-md-2' for='${questionIdRadio1}'>" +
            "<input type='radio' name='${questionId}' id='${questionIdRadio1}' value='1'>" +
            "</label>" +
            "<label class='col-md-2' for='${questionIdRadio2}'>" +
            "<input type='radio' name='${questionId}' id='${questionIdRadio2}' value='2'>" +
            "</label>" +
            "<label class='col-md-2' for='${questionIdRadio3}'>" +
            "<input type='radio' name='${questionId}' id='${questionIdRadio3}' value='3'>" +
            "</label>" +
            "<label class='col-md-2' for='${questionIdRadio4}'>" +
            "<input type='radio' name='${questionId}' id='${questionIdRadio4}' value='4'>" +
            "</label>" +
            "<label class='col-md-2' for='${questionIdError}'>" +
            "<input type='checkbox' name='${questionId}' id='${questionIdError}' value='5'>" +
            "</label>";
        $.template("formTemplateContent", markupFormContent);
        $.tmpl("formTemplateContent", markupFormContentData).appendTo(setDivContent);


        var markupFooter = "</div>" +
            "</fieldset>" +
            "</form>";

        $.template("formTemplateFooter", markupFooter);
        $.tmpl("formTemplateFooter").appendTo(setDiv);
    }
}*/

function pretestFormSwap() {
    $("#slide").animate({"right":"-220px"},1000,"swing",function() {
        $("#currprompt").text("Following the pretest, is the subject ready to begin the main exam?");
        $("#formA").text("Y");
        $("#formB").text("N");
        $("#slide").delay(100).animate({"right":"20px"},1000);
    });
}

function storePretest(form) {
    pretestProg[0] = form;
    videojs("mainPlayer").play()
    jQuery('#formA , #formB').unbind('click');
    pretestFormSwap();
}

function owlInit() {
    var owl = $("#form-carousel");


    owl.owlCarousel({
        navigation: true,
        navigationText: ["Previous Set","Next Set"],
        pagination: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        afterAction: afterAction,
        singleItem: true
    });

    function afterAction() {
        setNumber = this.owl.currentItem;
    }

    $(".owl-next").click(function(){
        videoSet(setNumber);
    });

    $(".owl-prev").click(function(){
        videoSet(setNumber);
    });

    $(".setForward, .setBack").click(function() {
        setNumber++;
        $("#studentProgress").animate({"left":"-220px"}, 500);
        videoSet(setNumber);
    });

    $(".setRewatch").click(function() {
        $("#studentProgress").animate({"left":"-220px"}, 500);
        videoSet(setNumber);
    });

    $("#formA").click(function() {
        storePretest(0);
    });

    $("#formB").click(function() {
        storePretest(1);
    });

}

$(document).ready(function() {
    owlInit();

// insertForms();
});
