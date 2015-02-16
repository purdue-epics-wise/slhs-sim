var setNumber = 0;

function loadVideo(videoEmbeddedUrl) {
    document.getElementById("content-container").innerHTML='<center><iframe width="960" height="720" src="http://' + videoEmbeddedUrl + '" frameborder="0" allowfullscreen></iframe></center>';
}

function loadLocalVideo(videoFile){
    document.getElementById("content-container").innerHTML='<center><video id="mainPlayer" class="video-js vjs-default-skin vjs-big-play-centered" controls autoplay preload="auto" width="960" height="720"></video></center>'
    document.getElementById("mainPlayer").innerHTML='<source src="'+ videoFile + '.mp4" type=\'video/mp4\' > <track label="English" kind="subtitles" srclang="en" src="' + videoFile + '.vtt" default>'
    videojs("mainPlayer", {
        controlBar: {
            playToggle: false,
            progressControl: {seekBar: false}
        }
    }, function(){
        //this.on("pause", function() {alert("hello");})
    }) // Player (this) is initialized and ready.
    pauseSet();
}

function videoSet(setNum){
    var player = videojs("mainPlayer");
    var duration = player.duration();
    var timeStamp = 0;
    if (setNum > 0) {
        timeStamp = duration / 12 * setNum;
    }
    player.currentTime(timeStamp);
    player.play();
}

function pauseSet(){
    var player = videojs("mainPlayer");
    document.getElementById("mainPlayer_html5_api").addEventListener('timeupdate', function() {
	//console.log("Current Time: " + player.currentTime());        
	if (player.currentTime() >= (setNumber + 1) * player.duration() / 12) {
	    player.pause();
            $("#studentProgress").delay(500).animate({"left":"20px"}, 500);
	}
    });
}



function getFormData() {

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

}

