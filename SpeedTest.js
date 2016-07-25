/*JS*/
  
var loadPage = function(){
	
	 document.getElementById("PauseButton").addEventListener("click", Listener, false);
	 document.getElementById("NewButton").addEventListener("click", Listener, false);
	 document.getElementById("textarea").addEventListener("keypress", Listener, false);
	 $("#textarea").attr("disabled",true);
};
 
var count = 0; 
var words = 1;
var seconds;
var errors;
var i ;
var boxChars ;
var charsTyped ;
var time;
var mistakes =[];

var Listener = function(e){
	
	var button1 = document.getElementById("PauseButton");
	var textArray = ["Something had gone wrong with him.",
						"Change an image when a user holds.",
						"Display an alert box when the page has.",
						"Add an event listener that fires.", "tali"];
	if(e.target.id == "PauseButton")
	{
		if(button1.innerHTML == "Pause"){
			clearInterval(time);
			$("#textarea").attr("disabled",true);
			button1.innerHTML = 'Resume';
		}
		else{  //Resume
			button1.innerHTML = 'Pause';
			time = setInterval(myTimer, 1000);
			$("#textarea").attr("disabled",false);
		
		}
	}
	
	else if(e.target.id == "NewButton")
	{
		$("#textarea").attr("disabled",false);
		clearInterval(time);
		seconds = 0;
		boxChars = 0;
		errors = 0;
		charsTyped = 0;
		i = 0;
		mistakes = [];
		$("#textarea").attr("class", "sectionStyle");
		
		document.getElementById("section1").innerHTML = textArray[count];
		if(count == 3)
			count=0;
		else
			count++;
		
		document.getElementById("timer").innerHTML = 0;
		document.getElementById("WPM").innerHTML = 0;
		document.getElementById("error").innerHTML = 0;
		document.getElementById("chars").innerHTML = 0;
		document.getElementById("textarea").value = '';
		document.getElementById("mistake").innerHTML = '';
	}
	
	else if(e.target.id == "textarea")
	{
		var string = document.getElementById("textarea").value;
		
		//alert(string.charAt(boxChars-1));
		var sourceString = textArray[count-1];
		
		if(seconds == 0){ //start the timer
			time = setInterval(myTimer, 1000);
			seconds++;
		}
		
		if(string.charAt(boxChars-1) != " "){
				charsTyped++;
				document.getElementById("chars").innerHTML = charsTyped;
		}
			
		var wpm = words/(seconds/60);
		document.getElementById("WPM").innerHTML = wpm;
	
		if(string.charAt(boxChars-1) != sourceString[boxChars-1]){
			if(boxChars!=0)
				mistakes[errors+1] = " "+string.charAt(boxChars-1)+"-"+sourceString[boxChars-1]+" ";
			document.getElementById("mistake").innerHTML = mistakes.toString();
			if(boxChars!=0)
				errors++;
		}
		document.getElementById("error").innerHTML = ((errors/boxChars)*100)+"%";	
		
		while(i < string.length) {  //count the words
			if(string[i] == " ")
				words++;
			i++;
		}
		
		if(sourceString.length-1 == boxChars && errors == 0){
			document.getElementById("textarea").value = 'You got it! Well done!';
			$("#textarea").attr("class", "sectionStyle3");
		}
		boxChars++;
	}
}

function myTimer(){
	document.getElementById("timer").innerHTML = seconds;
	seconds++;
}

