<?php
    $connect=mysqli_connect('localhost','root','','SLHS_SIM');
    
    if(mysqli_connect_errno($connect))
    {
        echo 'Failed to connect';
    }
    
?>