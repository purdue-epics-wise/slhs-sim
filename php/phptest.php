<!DOCTYPE html>
<html>
<body>

<h1>Connecting to SQL Database</h1>
<p>Can I connect to sqldatabase?</p>

<?php
$servername = "localhost";
$username = "root";
$password = "password";
$database = "slhs";

$conn = new mysqli($servername, $username, $password,$database);	


	//@sql_select_db($database) or die("Unable to select database");
    //$conn = new PDO("mysql:host=$servername;dbname=myDB", $username, $password);
    // set the PDO error mode to exception
	
//$db = new mysqli('localhost', $username, $password, $db) or die("Unable to connect");
	
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sqlclear = "TRUNCATE table Questions";

if (mysqli_query($conn, $sqlclear)) {
    echo "Table Cleared";
} else {
    echo "Error: " . $sqlclear . "<br>" . mysqli_error($conn);
}

$sql = "INSERT INTO Questions (testId, question, choiceA, choiceB, choiceC, choiceD, answer)
VALUES (1, 'What are basal scores?', 'answer a','the number of correct responses on a test required to find the starting point for the child','answer c','answer d', 'b')";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully\n";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
$sql2 = "INSERT INTO Questions (testId, question, choiceA, choiceB, choiceC, choiceD, answer)
VALUES (2, 'What are ceiling scores?', 'answer a','answer b','answer c','number of incorrect responses that lets you know when to end the test', 'd')";

if (mysqli_query($conn, $sql2)) {
    echo "New record created successfully\n";
} else {
    echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
}
$sql3 = "INSERT INTO Questions (testId, question, choiceA, choiceB, choiceC, choiceD, answer)
VALUES (3, 'What does the PPVT-4 assess?', 'answer a','answer b','answer c','answer d', 'c')";

if (mysqli_query($conn, $sql3)) {
    echo "New record created successfully\n";
} else {
    echo "Error: " . $sql3 . "<br>" . mysqli_error($conn);
}

$sql4 = "INSERT INTO Questions (testId, question, choiceA, choiceB, choiceC, choiceD, answer)
VALUES (4, 'What is a standard score?', 'answer a','answer b','answer c','is the signed number of standard deviations by which an observation or data is above the mean', 'd')";

if (mysqli_query($conn, $sql4)) {
    echo "New record created successfully\n";
} else {
    echo "Error: " . $sql4 . "<br>" . mysqli_error($conn);
}

$sql5 = "INSERT INTO Questions (testId, question, choiceA, choiceB, choiceC, choiceD, answer)
VALUES (5, 'What is a percentile rank?', 'answer a','a score is the percentage of scores in its frequency distribution that are equal to or lower than it','answer c','answer d', 'b')";

if (mysqli_query($conn, $sql5)) {
    echo "New record created successfully\n";
} else {
    echo "Error: " . $sql5 . "<br>" . mysqli_error($conn);
}

$sql6 = "INSERT INTO Questions (testId, question, choiceA, choiceB, choiceC, choiceD, answer)
VALUES (4, 'What is a raw score?', 'answer a','answer b','original datum that has not been transformed','answer d', 'c')";

if (mysqli_query($conn, $sql6)) {
    echo "New record created successfully\n";
} else {
    echo "Error: " . $sql6 . "<br>" . mysqli_error($conn);
}


$sql7 = "INSERT INTO Questions (testId, question, choiceA, choiceB, choiceC, choiceD, answer)
VALUES (4, 'Did the patient reach baseline?', 'answer a','answer b','answer c','answer d', 'd')";

if (mysqli_query($conn, $sql7)) {
    echo "New record created successfully\n";
} else {
    echo "Error: " . $sql7 . "<br>" . mysqli_error($conn);
}


$sql8 = "INSERT INTO Questions (testId, question, choiceA, choiceB, choiceC, choiceD, answer)
VALUES (4, 'Should you end test or continue?', 'answer a','answer b','answer c','answer d', 'd')";

if (mysqli_query($conn, $sql8)) {
    echo "New record created successfully\n";
} else {
    echo "Error: " . $sql8 . "<br>" . mysqli_error($conn);
}


mysqli_close($conn);
?>
</body>
</html>