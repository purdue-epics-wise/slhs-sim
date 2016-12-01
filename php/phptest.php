<!DOCTYPE html>
<html>
<body>

<h1>Connecting to SQL Database</h1>

<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "slhs"

//$conn = new mysqli($servername, $username, $password);

mysql_connect($servername,$username,$password) or die("Unable to connect to database");
	//@sql_select_db($database) or die("Unable to select database");
    //$conn = new PDO("mysql:host=$servername;dbname=myDB", $username, $password);
    // set the PDO error mode to exception
	
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
echo "Connected successfully"; 


msql_close($link);
?>

</body>
</html>