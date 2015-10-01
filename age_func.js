function ageCheck(birth_day, birth_month, birth_year, test_day,  test_month, test_year, start_num)
{ 
  //READ THROUGH FAQ PAGE FOR WEBSITE IF YOU DO NOT UNDERSTAND THIS FUNCTIONALITY
  //age is entered by user
  //start_num is where user thinks test should start
    
  var start_calc; //where test should start
  var month_diff = test_month - birth_month;
  var year_diff = test_year - birth_year;
  var day_diff = test_day - birth_month;
  
  if(month_diff < 0) //in case test taker has not completed a full year
  {
    year_diff -= 1;
  }
  if(month_diff == 0 &&  day_diff < 0) 
  { //in case test taker has not completed a full month and hence not full year
  
    year_diff -= 1;
  }
  
  switch(year_diff) //calculates where test should start
  {
    case 4: 
	start_calc = 13;
    	break;
    case 5: 
	start_calc = 37;
	break;
    case 6:	
	start_calc = 49;
	break;
    case 7:	
	start_calc = 61;
	break;
    case 8:	
	start_calc = 73;
	break;
    case 9:	
	start_calc = 85;
	break;
    case 10:	
	start_calc = 97;
	break;
    case 11:	
	start_calc = 109;
	break;
    case 12:	
	start_calc = 109;
	break;
    case 13:	
	start_calc = 121;
	break;
    case 14:	
	start_calc = 133;
	break;
    case 15:	
	start_calc = 133;
	break;
    case 16:	
	start_calc = 133;
	break;
    case 17:	
	start_calc = 145;
	break;
    case 18:	
	start_calc = 145;
	break;
    default:
	start_calc = 157;
   }

   if(start_calc != start_num)
   { //if user has entered wrong number to start at, error message to inform
     window.alert("wrong");
   }
}
