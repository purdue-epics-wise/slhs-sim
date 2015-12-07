//set number
// TODO - create map of values in external  document that can be loaded into side info panel
// detailing how raw score -> standard score
// might contact barb to see if we should just use one for reinforcement of concept (then corrected in actual administration)
var setNumber = 0;
var expandedOptions = 0;
//First number is form A(0) or B(1), second is number of training failures/attempts
var pretestProg = [0,0];
//player object stored here - used to determine if need wipe data or not on video change
var gplayer = null;

function loadLocalVideo(videoFile){
    //collapses jumbotron to change video, then expands with new content
	$("#cont").hide();
	document.getElementById("header").innerHTML = "Simulation 1";
    $("#slide").animate({right:"-200px"},750);
    $(".jumbotron").animate({height:"50px"},750,function() {
        if (gplayer !== null) {
            //reset everything
            $("#infocontentscores").hide();
            videojs("mainPlayer").dispose();
            currTimeStamp = 0;
            setNumber = 0;
            expandedOptions = 0;
            pretestProg = [0,0,0];
        }
        $("#video-container").html('<video id="mainPlayer" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="100%" height="100%"></video>');
        $("#mainPlayer").html('<source src="'+ videoFile + '.mp4" type=\'video/mp4\' > <track label="English" kind="subtitles" srclang="en" src="' + videoFile + '.vtt" default>');
        //customize video controls, make new player
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
        //temp mute volume because gets annoying while working
        gplayer.volume(0.5);
    });
    //bootstrap is really F*cking stupid so we're doing a hack-ish fix
    $(".navbar").animate({height:"96px"},750,function() {
        $(this).animate({height:"48px"},1500,function() {
            formSwap(0);
            toggleSetChoices(expandedOptions);
        });
    });
	document.getElementById('reviewQuestions').style.display='block';
}

//calling this function determines how the video pauses and resumes
var currTimeStamp = 0;
function videoSet(setNum){
    var timeStamp = 0;
    if (setNum > 0) {
        timeStamp = timestampsList[currTimeStamp-1];
    }
    gplayer.currentTime(timeStamp);
    gplayer.play();
}

//pauses every X seconds or @ each timestamp
function pauseSet(){
    document.getElementById("mainPlayer_html5_api").addEventListener('timeupdate', function() {
	//console.log("Current Time: " + player.currentTime());
    	  if (gplayer.currentTime() >= timestampsList[currTimeStamp] || gplayer.currentTime() >= gplayer.duration()) {
    	      gplayer.pause();
                //need to insert a handler here to decide which function to call at each pause
            $("#startYdes,#startN").animate({"opacity":1},500);
            toggleSetChoices(expandedOptions);
    	}
    });
}

//generates a random color
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


//keeping track of question-level variables
var startItem = 0; //number of item we start on
var currItem = 0; //number of current item
var errorCounter = 0; //number of questions with error box checked

//control and generation of set pages (radio buttons and checkboxes, add to index for switching)
var pages=[];
function addSet() {
    var randomColorStr = getRandomColor();
    //make a new div for each set. This keeps it organized. Set style here because
    //otherwise too many css selectors.
    var newSet = $("<div/>", {
        "id": "setQS" + setNumber,
        "class": "setQSstyle",
        "style": "background:" + randomColorStr + ";color:#ffffff"
    });
    //radio label generator (i.e. 1 2 3 4 E)
    for (var i = 0; i < 5; i++) {
        var letter = (i == 4) ? "E" : (i+1);
        newSet.append("<span class='letterLabel'>" + letter + "</span>");
    }
    //radio form/button generator
    var radioForm = $("<form/>");
    //generate twelve questions with 4 radio buttons each, and one error checkbox
    for (i = 0; i < 12; i++) {
        for (var j = 0; j < 4; j++) {
            letter = j+1;
            //should have value s1q1 and fetching value will return A,B,C, or D
            radioForm.append('<input type="radio" name="s' + setNumber + 'q' + i + '" value="' + letter + '" />');
        }
        //should have example value for set 1 question 1 of: s1q1e
        //then later check if it's checked or not to see if that question is marked as wrong
        var checkbox = $('<input type="checkbox" name="s' + setNumber + 'q' + i + 'e" value="" />');
        //monitors checkbox state to adjust error counter
        $(checkbox).change(function() {
            if(this.checked) {
                errorCounter++;
            } else {
                errorCounter--;
            }
            $("#errorCount").text(errorCounter);
        });
        radioForm.append(checkbox);
        radioForm.append("<span class='qNum'>(<b>" +
            formAkey[currItem-1] + "</b>) " +
            currItem++ + "</span><br>");
    }
    //add instructions to each slide after all the radio buttons
    radioForm.append("<p id='instructions'>Use this form to keep track of the subject's\
        responses and errors they may make.<br>The bolded number in parenths is the\
        correct answer to the question.</p>");
    //put radio button form in that div we made earlier
    radioForm.appendTo(newSet);
    //put new div into outer div containing all sets
    newSet.appendTo("#setView");
    //add to index of all sets for swapping
    pages.push(newSet);
    //    alert(pages[0].attr("id")); DEBUG
    //generate button that lets you swap to set page
    var newSetButton = $("<a/>", {
        "class": "setQSBstyle",
        "style": "background:" + randomColorStr + ";color:#ffffff",
        text: setNumber + 1
    });
    //offset based on set number
    newSetButton.css({"left": setNumber * 15});
    newSetButton.appendTo("#setSwapControl");
    $(newSetButton).click(showPage.bind(null, setNumber));
    //automatically show newly generated page
    showPage(setNumber);
}

//set up variable for swap function
var currPageI = -1;
function showPage(index) {
    //this shouldn't ever happen but if it does it alerts
    if (index > pages.length) {alert("out of bounds, fix this");}
    //if we're on the page of the button being clicked do nothing
    if (index === currPageI) {return;}
    //checks to see if there is a page being shown right now
    var currentPage = pages[currPageI];
    //if (there is a page being shown) then push it out of frame to the left
    if (currentPage) {
        currentPage.stop().animate({left:-200});
    }
    //sets next page to the page corresponding to the button that was clicked
    //If you click the button labelled "2", sets to that page
    var nextPage = pages[index];
    //page spawns offscreen to the right, then replaces old page
    nextPage.stop().css({left:200}).animate({left:0});
    //sets the current page to the page now showing
    currPageI = index;
}

//blank array to store value of checked radio buttons
var collected = [];
function collectResponses() {
    //setNumber + 1 to collect from all pages
    for (var i = 0; i < setNumber + 1; i++) {
        //temp array of answers specific to current set
        var currSetResponse = [];
        for (var j = 0; j < 12; j++) {
            //collect all the answers using the names we assigned earlier in the
            //generator function
            currSetResponse[j] = $("input:radio[name=s"+i+"q"+j+"]:checked").val();
        }
        //will show each set + collected answers in the JS console for debugging
        console.log("Set" + (i+1) + ":" + currSetResponse.toString());
        //add to array of all responses
        collected[i] = currSetResponse;
    }
}

function scoreHandler() {
    //shows graphing page
    document.getElementById("content-container").innerHTML='<object type="text/html" data="modules/stats/index.html"></object>';
}

//function to help show forms at proper times
function formSwap(formnum) {
    $("#slide").animate({"right":"-200px"},500,function () {
        if (formnum == 1) {
            $("#formPrompt").hide();
            $("#beginPrompt").show(function () {
//                $("#formPrompt").removeClass("active");
//                $("#beginPrompt").addClass("active");
//                $("#slide").animate({"right":"0px"},500);
                $("#studentProgress").animate({"left":"0px"},500);
            });
        } else if (formnum == 2) {
            $("#beginPrompt").hide();
            $("#form-carousel").show(function () {
//                $("#form-carousel").addClass("active");
//                $("#beginPrompt").removeClass("active");
//                $("#slide").animate({"right":"0px"},500);
            });
        } else if (formnum == 0) {
            $("#form-carousel,#beginPrompt").hide();
            $("#formPrompt,#infopanel").show(function () {
//                $("#formPrompt").addClass("active");
//                $("#form-carousel").removeClass("active");
//                $("#slide").animate({"right":"0px"},500);
                expandedOptions = 0;
            });
        }
    });
}

//does fancy animation thingies if you press no
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
    //increment # of times attempted training questions
    pretestProg[2]++;
}

//changes how the buttons for set progression/regression appear
function toggleSetChoices(inout) {
    //show all options on pause
    if (inout == 1) {
        $(".setForward").animate({"top":"215px"},500);
        $(".setBack").animate({"top":"411px"},500);
        $(".endExam").animate({"top":"509px"},500);
    } else if (inout == 2) {
        //show forward/rewatch on pause
        $(".setForward").animate({"top":"215px"},500);
        $(".endExam").animate({"top":"411px"},500);
    } else {
        //collapse options
        $(".setForward,.setBack,.endExam").animate({"top":"313px"},500);
    }
}

//idk if ill even end up needing this
function storePretest(form) {
    pretestProg[0] = form;
    videojs("mainPlayer").play();
    $("#startYdes,#startN").css({"opacity":0.75});
    formSwap(1);
}

//pretty much just assigns all the onclick functions for various buttons
//some jquery stuff but not really that obscure
function owlInit() {
    $(".setForward").click(function() {
        expandedOptions = 2;
        toggleSetChoices(0);
        //we're adding a new set, so add to max
        setNumber++;
        currTimeStamp++;
        if (currItem <= startItem) {
            currItem = startItem + 12;
            }
        if (pages.length > 12 || currItem >= 229) {
            alert("Too many sets - check your work!");
        } else {
            addSet();
            videoSet(currTimeStamp);
        }
    });


    $(".setBack").click(function() {
        toggleSetChoices(0);
        setNumber++;
        currTimeStamp++;
        currItem -= 24;
        if (pages.length > 12) {
            alert("Too many sets - check your work!");
        } else {
            addSet();
            videoSet(currTimeStamp);
        }
    });

    $(".setRewatch").click(function() {
        toggleSetChoices(0);
        videoSet(currTimeStamp);
    });

    $(".endExam").click(function() {
        toggleSetChoices(0);
        collectResponses();
        var scoreString = "";
        for (var i = 0; i < rawToStandard18.length; i++) {
            scoreString += rawToStandard18[i++] + " --> " + rawToStandard18[i]+"<br>";
        }
        $("#infocontentscores").empty().append(scoreString).show();
        $("#infocontent").hide();
        scoreHandler();
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
        if (parseInt($("#startYdes").val()) % 12 == 1) {
            currItem = startItem += parseInt($("#startYdes").val());
            if (gplayer.paused()) {
                currTimeStamp++;
                videoSet(currTimeStamp);
                expandedOptions = 1;
                formSwap(2);
                addSet();
            }
        } else {
            alert("Enter a valid start number. See info panel for details.");
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
            currTimeStamp++;
            delayStartExam();
            videoSet(currTimeStamp);
        }
    });

    var infotogglestate = 0;
    $("#infotoggle").click(function() {
        if (infotogglestate) {
            $(this).animate({"bottom":"0px"},500);
            $("#infocontent,#infocontentscores").animate({"height":"0px"},500,function() {
                $("#infotoggle").text("expand age info");
            });
            infotogglestate = 0;
        } else {
            $(this).animate({"bottom":"695px"},500);
            $("#infocontent,#infocontentscores").animate({"height":"695px"},500,function() {
                $("#infotoggle").text("collapse");
            });
            infotogglestate = 1;
        }
    });


}

$(document).ready(function() {
    owlInit();
});

function quest1yes() {                      
	if(errorCounter <= 1) {                         
		window.alert("Correct!");                      
	} else {                         
		window.alert("Incorrect! Please check the number of errors");
    }
}
              
function quest1no() {
	if(errorCounter > 1) {
		window.alert("Correct!");
    } else {
		window.alert("Incorrect! Please check the number of errors");
    }
} 
