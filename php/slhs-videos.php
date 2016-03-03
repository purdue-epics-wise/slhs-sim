<?php
$conn = mysqli_connect("jaesi.no-ip.biz", "jsulli95", "", "slhs-sim");

$slhsVideos = array();

$sql = "SELECT * FROM videos";

$result = $conn->query($sql);
while($row = mysqli_fetch_assoc($result)) {
	array_push($slhsVideos, $row['videoFilepath']);
}

header('Content-type: application/json');
echo json_encode($slhsVideos);

?>