var setNumber = 0;
var expandedOptions = 0;
//[(0=a 1=b),(once yes, store startitem here),(number of "not readies")
var pretestProg = [0,0,0];
var studentSetProg = [];
var gplayer = null;
var currPageI = -1;

function loadVideo(videoEmbeddedUrl) {
    document.getElementById("content-container").innerHTML='<center><iframe width="960" height="720" src="http://' + videoEmbeddedUrl + '" frameborder="0" allowfullscreen></iframe></center>';
}

function loadLocalVideo(videoFile){
    //TODO: implement all data set resets here (answers, saved form data, etc.)
    //collapses jumbotron to change video, then expands with new content
    $("#slide").animate({right:"-200px"},750);
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
        //temp mute volume because loud
        gplayer.volume(0);
    });
    //bootstrap is really ****ing stupid
    $(".navbar").animate({height:"96px"},750,function() {
        $(this).animate({height:"48px"},1500,function() {
            formSwap(0);
            toggleSetChoices(0);
        });
    });
}

function videoSet(setNum){
    var duration = gplayer.duration();
    var timeStamp = 0;
    if (setNum > 0) {
        timeStamp = duration / 40 * setNum;
    }
    gplayer.currentTime(timeStamp);
    gplayer.play();
}

function pauseSet(){
    document.getElementById("mainPlayer_html5_api").addEventListener('timeupdate', function() {
	//console.log("Current Time: " + player.currentTime());        
	if (gplayer.currentTime() >= (setNumber + 1) * gplayer.duration() / 40) {
	    gplayer.pause();
            //need to insert a handler here to decide which function to call at each pause
            $("#startYdes,#startN").animate({"opacity":1},500);
            if (expandedOptions == 1) {
                toggleSetChoices(1);
            }
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

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var pages=[];
var errorCounter = 0;
function addSet() {
    if (pages.length > 12) {alert("Too many sets - check your work!");return;}
    var randomColorStr = getRandomColor();
    var newSet = $("<div/>", {
        "id": "setQS" + setNumber,
        "class": "setQSstyle",
        "style": "background:" + randomColorStr + ";color:#ffffff",
    });
    //radio generator
    for (var i = 0; i < 5; i++) {
        var letter = (i == 4) ? "Error" : String.fromCharCode(65+i);
        newSet.append("<span class='letterLabel'>" + letter + "</span>");
    }
    var radioForm = $("<form/>");
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 4; j++) {
            var letter = String.fromCharCode(65 + j);
            //should have value s1q1 and fetching value will return A,B,C, or D
            radioForm.append('<input type="radio" name="s' + setNumber + 'q' + i + '" value="' + letter + '" />');
        }
        //should have example value for set 1 question 1 of: s1q1e
        //then later check if it's checked or not to see if that question is marked as wrong
        var checkbox = $('<input type="checkbox" name="s' + setNumber + 'q' + i + 'e" value="" />');
        $(checkbox).change(function() {
            if(this.checked) {
                errorCounter++;
            } else {
                errorCounter--;
            }
            $("#errorCount").text(errorCounter);
        });
        radioForm.append(checkbox);
        radioForm.append("<br>");
    }
    radioForm.appendTo(newSet);
    newSet.appendTo("#setView");
    pages.push(newSet);
    //    alert(pages[0].attr("id")); DEBUG
    var newSetButton = $("<a/>", {
        "class": "setQSBstyle",
        "style": "background:" + randomColorStr + ";color:#ffffff",
        text: setNumber
    });
    var localsn = setNumber - 1;
    newSetButton.css({"left":localsn * 15});
    newSetButton.appendTo("#setSwapControl");
    $(newSetButton).click(showPage.bind(null, localsn));
    showPage(localsn);
}

var currPageI = -1;
function showPage(index) {
    if (index > pages.length) {alert("out of bounds, fix this");}
    if (index === currPageI) {return;}
    var currentPage = pages[currPageI];
    if (currentPage) {
        currentPage.stop().animate({left:-200});
    }
    var nextPage = pages[index];
    nextPage.stop().css({left:200}).animate({left:0});
    currPageI = index;
}

var collected = [];
function collectResponses() {
    console.log(setNumber);
    for (var i = 0; i < setNumber; i++) {
        var currSetResponse = [];
        for (var j = 0; j < 12; j++) {
            currSetResponse[j] = $("input:radio[name=s"+(i+1)+"q"+j+"]:checked").val();
        }
        collected[i] = currSetResponse;
        alert(collected[i].toString());
    }
}

function formSwap(formnum) {
    $("#slide").animate({"right":"-200px"},500,function () {
        if (formnum == 1) {
            $("#formPrompt").hide();
            $("#beginPrompt").show(function () {
//                $("#formPrompt").removeClass("active");
//                $("#beginPrompt").addClass("active");
                $("#slide").animate({"right":"0px"},500);
                $("#studentProgress").animate({"left":"0px"},500);
            });
        } else if (formnum == 2) {
            $("#beginPrompt,#infopanel").hide();
            $("#form-carousel").show(function () {
//                $("#form-carousel").addClass("active");
//                $("#beginPrompt").removeClass("active");
                $("#slide").animate({"right":"0px"},500);
            });
        } else if (formnum == 0) {
            $("#form-carousel,#beginPrompt").hide();
            $("#formPrompt,#infopanel").show(function () {
//                $("#formPrompt").addClass("active");
//                $("#form-carousel").removeClass("active");
                $("#slide").animate({"right":"0px"},500);
                expandedOptions = 0;
            });
        }
    });
}

function delayStartExam () {
    if (pretestProg[0]) {
        pretestProg[0] = 0;
        var tmptext = "Regressing to form A...";
    } else {var tmptext = "Continue practice...";}
    
    $("#startN").css({"z-index":1}).animate({width:"192px"},500,function() {
        $("#swaptext").fadeOut(500,function() {
            $("#startN").css({"font-size":"16px"});
            $(this).text(tmptext);
        }).fadeIn(500).delay(500).fadeOut(500, function() {
            $("#swaptext").text("N");
            $("#startN").css({"font-size":"50px","z-index":0});
            $("#swaptext").fadeIn(500, function() {
                $("#startN").animate({width:"94px"},500,function() {
                    $("#startYdes,#startN").animate({"opacity":0.75},500);
                });
            });
        });
    });
    pretestProg[2]++;
}

function toggleSetChoices(inout) {
    if (inout == 1) {
        $(".setForward").animate({"top":"215px"},500);
        $(".setBack").animate({"top":"411px"},500);
        $(".endExam").animate({"top":"509px"},500);
    } else {
        $(".setForward,.setBack,.endExam").animate({"top":"313px"},500);
    }
}

function storePretest(form) {
    pretestProg[0] = form;
    videojs("mainPlayer").play();
    $("#startYdes,#startN").css({"opacity":0.75});
    formSwap(1);
}

function owlInit() {
   /* var owl = $("#form-carousel");

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

    $(owl).toggle();*/

    $(".setForward, .setBack").click(function() {
        toggleSetChoices(0);
        setNumber++;
        addSet();
        videoSet(setNumber);
    });

    $(".setRewatch").click(function() {
        toggleSetChoices(0);
        videoSet(setNumber);
    });

    $(".endExam").click(function() {
        toggleSetChoices(0);
        collectResponses();
    });
    
    $("#formA").click(function() {
        storePretest(0);
    });

    $("#formB").click(function() {
        storePretest(1);
    });
    //need to make Y/N buttons uninteractive while set is playing
    //could just use .paused() API of videojs probably
    $("#startY").submit(function(event) {
        event.preventDefault();
        alert($("#startYdes").val());
        if (gplayer.paused()) {
            setNumber++;
            videoSet(setNumber);
            expandedOptions = 1;
            formSwap(2);
            addSet();
        }
    });

    $("#startYdes").focus(function() {
        if (gplayer.paused()) {
            $(this).css({"z-index":1});
            $(this).animate({"width": "192px"},500,function() {
                $(this).css({"font-size":"20px"}).attr("placeholder","Enter start item #");
            });
        } else {
            $(this).blur();
        }
    }).blur(function() {
        $(this).val("").attr("placeholder","Y").css({"font-size":"50px"});
        $(this).animate({"width": "94px"},500,function () {
            $(this).css({"z-index":0});
        });
    });
    
    $("#startN").click(function() {
        if (gplayer.paused()) {
            setNumber++;
            delayStartExam();
            videoSet(setNumber);
        }
    });
    var infotogglestate = 0;
    $("#infotoggle").click(function() {
        if (infotogglestate) {
            $(this).animate({"bottom":"0px"},500);
            $("#infocontent").animate({"height":"0px"},500,function() {
                $("#infotoggle").text("expand age info");
            });
            infotogglestate = 0;
        } else {
            $(this).animate({"bottom":"695px"},500);
            $("#infocontent").animate({"height":"695px"},500,function() {
                $("#infotoggle").text("collapse");
            });
            infotogglestate = 1;
        }
    });


}

$(document).ready(function() {
    owlInit();

// insertForms();
});
