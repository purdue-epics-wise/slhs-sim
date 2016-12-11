<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- saved from url=(0031)http://www.purdue.edu/hhs/slhs/ -->
<html class=" js canvas canvastext geolocation crosswindowmessaging websqldatabase indexeddb hashchange historymanagement draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions  video audio localstorage sessionstorage webworkers applicationcache svg smil svgclippaths   fontface"><!-- InstanceBegin template="/Templates/masterpage.dwt.php" codeOutsideHTMLIsLocked="false" --><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
    <!--<meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="keywords" content="Purdue, Health and Human Sciences, Speech Language Hearing Sciences, SLHS, audiology, speech pathology, speech, autism, research">
    <meta name="robots" content="ALL">
    <meta name="description" content="">-->
    <!-- InstanceBeginEditable name="doctitle" -->
    <title>SLHS - Health and Human Sciences</title>
    <!-- InstanceEndEditable -->
	<link rel="stylesheet" href="https://www.purdue.edu/assets/globals/css/v4_purdue/reset.css">
    <link rel="stylesheet" href="https://www.purdue.edu/assets/globals/css/v4_purdue/template.css">
    <link rel="stylesheet" href="https://www.purdue.edu/assets/globals/css/v4_purdue/menus.css">
    
    <!--Additional CSS-->
    
    <!--[if lt IE 7]>
      <link rel="stylesheet" href="https://www.purdue.edu/assets/globals/css/v4_purdue/ie6.css" />
    <![endif]-->          
    
    <!-- Modernizr adds classes to the html element that identify browser capabilities -->

    <script async="" src="./SLHS - Health and Human Sciences_files/analytics.js"></script><script src="./SLHS - Health and Human Sciences_files/modernizr-1.5.min.js"></script>

    <!--[if lt IE 9]>
      <script src="https://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js">IE7_PNG_SUFFIX=".png";</script>
    <![endif]-->
    
    <link href="/slhs-sim/SLHS - Health and Human Sciences_files/jquery-ui.css" rel="stylesheet" type="text/css"> 
    <script src="/slhs-sim//SLHS - Health and Human Sciences_files/jquery.min.js"></script> 
    <script src="/slhs-sim/SLHS - Health and Human Sciences_files/jquery-ui.min.js"></script>
    
    <!-- Updated menus script that uses jQuery instead of prototype --> 
    <script src="/slhs-sim//SLHS - Health and Human Sciences_files/menus2.js" type="text/javascript"></script> 
    <!-- Slider Configurations - VERY IMPORTANT -->

    <link href="/slhs-sim/SLHS - Health and Human Sciences_files/DDSlider.css" rel="stylesheet" type="text/css">
    <!-- jQuery framework -->
    <script type="text/javascript" src="./SLHS - Health and Human Sciences_files/jquery.min(1).js"></script>
    <!-- jQuery easing plugin - VERY IMPORTANT -->
    <script type="text/javascript" src="./SLHS - Health and Human Sciences_files/jquery.easing.1.3.js"></script>
    <!-- DDSlider jQuery Plugin - VERY IMPORTANT -->
    <script type="text/javascript" src="./SLHS - Health and Human Sciences_files/jquery.DDSlider.min.js"></script>

    <!-- SWFObject library for flash video -->
    <script src="./SLHS - Health and Human Sciences_files/swfobject_modified.js" type="text/javascript"></script>
    
    <script type="text/javascript">
      $j = jQuery.noConflict();
      $j(document).ready(function() {
     
        // Load additional scripts and execute commands after the page has loaded
        $j.ajaxSetup({async: false});

       // $j.ajaxSetup({async: true});
      
        // triggers the slider
       				
      });
    </script>

  </head>
<body class="landing-page">
<!-- START ACCESSIBILITY LINKS TO SKIP TO CONTENT -->

    
    <a id="jump-to-banners" class="accessible-text" href="http://www.purdue.edu/hhs/slhs/#slider">Jump to featured news</a>
    <a id="jump-to-news" class="accessible-text" href="http://www.purdue.edu/hhs/slhs/#main-content-container">Jump to other news and events</a>
    
    <!-- END ACCESSIBILITY LINKS -->
    
    <div id="top-background-strip"></div>
  
    <div id="page-container">
    
      <div id="header-container">
      
      	<div id="header-top-strip"></div>

    
        <!-- PAGE TITLE -->
        <div id="purdue-signature-container">
            <a href="https://www.purdue.edu/"><img src="/slhs-sim/images/PU_signature_white_bg_215x80.png" alt="Purdue signature" width="202" height="75" border="0" id="purdue-signature"></a>
        </div>
        
        <!-- PAGE TITLE -->
        <div id="page-title" style="width:430px;"><a href="http://www.purdue.edu/hhs/slhs/index.php" style="top:0px;"><img src="/slhs-sim/images/header.png" alt="Speech, Language, and Hearing Sciences"   width="339" height="41"></a><br><span style="font-size:14px;"><a href="https://www.purdue.edu/hhs/"></a></span>
            <br>
            <span style="font-size:14px;">
                <a href="https://www.purdue.edu/hhs/">PPVT-IV</a>
            </span>
            </br>
        </div>

          
        <!-- START SOCIAL MEDIA LINKS -->
        
        <div id="social-media-container">

			<a id="facebook-link" title="Purdue HHS Facebook page" href="https://www.facebook.com/pages/Purdue-University-College-of-Health-and-Human-Sciences/162069027193497" target="_blank"><span class="accessible-text">Purdue College of Health and Human Sciences  Facebook page</span></a>

		</div>        
        <!-- END SOCIAL MEDIA LINKS -->

      </div>
     
     <!-- START NAV BARS -->
     <div id="nav-bars">
         <div id="upper-nav-bar">
             <ul class="tabs" style="margin-bottom: 0">
                  <li><a href="">Home Page</a></li>
                  <li><a href="/slhs-sim/html/instructions.html">Instructions</a></li>
                  <li><a href="/slhs-sim/html/SIM.html">FAQ</a></li>
                  <li><a href="/slhs-sim/html/index.html">Simulations</a></li>
             </ul>
         </div>
     </div>    
     <!-- END NAV BARS -->
	 <div class="questions">
<?php
	
	$servername = "localhost";
	$username = "root";
	$password = "password";
	$database = "slhs";

	$conn = new mysqli($servername, $username, $password,$database);	
	
	// Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}
	
	$sql = "SELECT * FROM Questions";
	$result = $conn->query($sql);
	$totalCorrect = 0;
	$c = 1;
	while($row = $result->fetch_assoc()) {
		$a = $_POST[$c];
		#print "   a is " . $a;
		#print "    row is " . $row["answer"];
		
		
		echo "<h3>" . $c .  ". " . $row["question"] ."</h3>";
		echo "<div>";
		echo "<input type='radio' name='" . $c . "' value='a'>" . $row["choiceA"];
		echo "</div>";
		echo "<div>";
		echo "<input type='radio' name='" . $c . "' value='b'>" . $row["choiceB"];
		echo "</div>";
		echo "<div>";
		echo "<input type='radio' name='" . $c . "' value='c'>" . $row["choiceC"];
		echo "</div>";
		echo "<div>";
		echo "<input type='radio' name='" . $c . "' value='d'>" . $row["choiceD"];	
		echo "</div>";
		
		if ($a == $row["answer"]) { 
			echo "<p><font face='verdana' color='green'>Answer is Correct\n</font></p>";
			$totalCorrect++; 
		}
		else{
			echo "<p><font face='verdana' color='red'>Answer is Wrong\n</font></p>";
		}
		
		$c++;
	}
    
    echo "<div id='results'>$totalCorrect / 8 correct</div>";
    
?>
		</div>
<!-- BEGIN: FOOTER -->
        <div id="footer-container" class="float-group round-bottom10">

        
        
        <div id="left-foot"> Developed by EPICS, in cooperation with the Purdue University Speech, Language and Hearing Sciences Department<br>
            Speech, Language, &amp; Hearing Sciences, Lyles-Porter Hall, 715 Clinic Drive, West Lafayette, 47907-2122, <span class="phone">PH: (765) 494-3789</span><br>
              
            <a href="http://www.purdue.edu/purdue/disclaimer.html">2014 Purdue University</a> | <a href="http://www.purdue.edu/purdue/ea_eou_statement.html">An equal access/equal opportunity university</a> | <a href="http://www.purdue.edu/securepurdue/DMCAAgent.cfm">Copyright Complaints</a><br>

            If you have trouble accessing this page because of a disability, please contact the webmaster at <a href="mailto:slhs@purdue.edu">slhs@purdue.edu</a>.
          </div>
          
          
        
        <!-- END:FOOTER -->
        
		</div>
    </div>
    
    <div id="bottom-pad">&nbsp;</div>

<!-- InstanceEnd -->

</body></html>