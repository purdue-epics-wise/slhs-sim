function loadVideo(videoEmbeddedUrl) {
  document.getElementById("content-container").innerHTML='<center><iframe width="960" height="720" src="http://' + videoEmbeddedUrl + '" frameborder="0" allowfullscreen></iframe></center>';
}

function loadLocalVideo(videoFile){
  document.getElementById("content-container").innerHTML='<center><video id="mainPlayer" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="960" height="720"></video></center>'
  document.getElementById("mainPlayer").innerHTML='<source src="'+ videoFile + '.mp4" type=\'video/mp4\' > <track kind="captions" src="' + videoFile + '.vtt" label="English" default >'
  videojs("mainPlayer", {}, function(){}) // Player (this) is initialized and ready.

}

function insertForms() {

  for (var f = 0; f < 12; f++) {

    var setDiv = "#set" + (f + 1);
    var setDivContent = setDiv + "-form-content";

    var markupHeader = "<form class='form-horizontal'>" +
      "<fieldset>" +
      "<legend>Set " + (f + 1) + "</legend>" +
      "<div id='set"+ (f + 1) +"-form-content' class='form-group'>" +
      "<label class='col-md-1' for='q1'> </label>";

    $.template("formHeader", markupHeader);
    $.tmpl("formHeader").appendTo(setDiv);


    var markupFormHeaderData = [
        { Label: "A" },
        { Label: "B" },
        { Label: "C" },
        { Label: "D" },
        { Label: "Error" }
      ];
    var markupFormHeader = "<label class='col-md-2' for='q1'>${Label}</label>";

    $.template("formTemplateHeader", markupFormHeader);
    $.tmpl("formTemplateHeader", markupFormHeaderData).appendTo(setDivContent);


    var markupFormContentData = [];
    for (var i = 0; i < 12; i++) {
      markupFormContentData[i] = {
        questionNumber: (i + 1),
        questionId: "q" + (i + 1),
        questionIdRadio1: "q" + (i + 1) + "-1",
        questionIdRadio2: "q" + (i + 1) + "-2",
        questionIdRadio3: "q" + (i + 1) + "-3",
        questionIdRadio4: "q" + (i + 1) + "-4",
        questionIdError: "q" + (i + 1) + "-error"
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

