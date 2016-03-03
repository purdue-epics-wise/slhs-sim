function populateSelect (data) {
	console.log(data);
	//use ajax to make call to database
	for(i = 0; i < data.length; i++) {
		//append video to select
		$('#slhsVideoSelect').append('<option>' + data[i] + '</option>');
	}
}

function loadVideo() {
	//get selected video value
	var val = document.getElementById('slhsVideoSelect').value;
	console.log(val);

	var siteLink = "http://jaesi.no-ip.biz/Media/Anime/Epics/" + val;

	var video = document.getElementById("slhsVideo");

	video.src = siteLink;

	video.load();

	video.play();

}

function getVideosFromDB() {
	$.ajax({
		url: '/slhs-sim-new/php/slhs-videos.php',
		type: 'GET',
		dataType: 'json',
		complete: function(response) {
			var data = JSON.parse(response.responseText);
			populateSelect(data);
		}
	});
}