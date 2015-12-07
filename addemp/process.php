<?php include 'database.php'; ?>

<?php

// create a variable
$Student_ID=$_POST['Student_ID'];
$Name=$_POST['Name'];
$Password=$_POST['Password'];
$Identification=$_POST['Identification'];
    
//Execute the query

mysqli_query($connect,"INSERT INTO User_info (Student_ID,Name,Password,Identification) VALUES ('$Student_ID','$Name','$Password','$Identification')");
                 
    if(mysqli_affected_rows($connect) > 0){
    echo "<p>User added</p>";
    echo "<a href=\"index.html\">Go Back</a>";
} else {
    echo "User NOT Added<br />";
    echo mysqli_error ($connect);
}