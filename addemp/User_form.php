<!DOCTYPE html>
<html>
<head>
<style>
label{display:inline-block;width:100px;margin-bottom:10px;}
</style>


<title>Add User</title>
</head>
<body>

<form method="post" action="process.php">
<label>Student ID (PUID)</label>
<input type="text" name="Student_ID" />
<br />
<label>Name</label>
<input type="text" name="Name" />
<br />
<label>Password</label>
<input type="text" name="Password" />
<br />
<label>Identification (Prof/Student)</label>
<input type="text" name="Identification" />

<br />
<input type="submit" value="Add user">
</form>



</body>
</html>