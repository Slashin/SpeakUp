
//Global Variable Declarations
var indexArr = [];
var textArr = [];

//Class declaration for CustomWord Class
class customWord {

	constructor(text, color) {
	    this.text = text;
	    this.color = color;
  }

}

//Default Custom Words
var um = new customWord("um", "Tomato");
var uh = new customWord("uh", "Orange");
var umm = new customWord("umm", "DodgerBlue");
var uhh = new customWord("uhh", "MediumSeaGreen");
var uhm = new customWord("uhm", "Cyan");
var like = new customWord("like", "SlateBlue");
var basically = new customWord("basically", "Violet");

var customArr = [basically, like, uhh, umm, uhm, uh, um];



//Continous Pinging and Display Function
setInterval(function(){

	var currColor;
	var currWord;

	var text = document.getElementById("transcriptText").innerHTML.split(' ');


	for(var i = 0; i<text.length; i++){ 			

		for(var j = 0; j<customArr.length; j++){

		currWord = customArr[j];
		currColor = currWord.color;

		var wordLength = currWord.text.length;
		var upperWordTrue = false;
		var upperWordCapTrue = false;
		var upperWord;
		var upperWordCap;

		if(text[i].substring(13).toLowerCase() == currWord.text.toLowerCase() ){
			upperWord = text[i].substring(13);
			upperWordTrue = true;
		}else if(text[0].substring(6).toLowerCase() == currWord.text.toLowerCase()){
			upperWord = text[i].substring(6);
			upperWordTrue = true;
		}

		if(text[i].substring(13).toLowerCase() == currWord.text.toLowerCase()+'.' ){
			upperWordCap = text[i].substring(13);
			upperWordCapTrue = true;
		}else if(text[0].substring(6).toLowerCase() == currWord.text.toLowerCase()+'.'){
			upperWordCap = text[i].substring(6);
			upperWordCapTrue = true;
		}

		if(text[i] == currWord.text || upperWordTrue == true){
			if(upperWordTrue){
				text[i] = '<span class = "highlightWord" style="background-color:' + currColor + '">' + upperWord + '</span>';
			}else{
				text[i] = '<span class = "highlightWord" style="background-color:' + currColor + '">' + currWord.text + '</span>';
			}	
			console.log(text);

		} else if(text[i] == currWord.text+'.' || upperWordCapTrue == true){
			if(upperWordCapTrue){
				text[i] = '<span class = "highlightWord" style="background-color:' + currColor + '">' + upperWordCap + '</span>';
			}else{
				text[i] = '<span class = "highlightWord" style="background-color:' + currColor + '">' + currWord.text + '.</span>';
			}
			
		}
		
		}

	}

	document.getElementById("transcriptionBox").innerHTML = text.join(" ");
	document.getElementById("transcriptionBoxSide").innerHTML = text.join(" ");

	// console.log(text);

	$(document).ready(function(){
		$(".closeButtonStyle").click(function(){
	  		$(this).parent().css('display' , 'none');
	  		removeWord($(this).parent().text());
		});

		var divContent = document.getElementById("transcriptText").innerText.toString();

		function enthus(score){
			console.log(score.substring(16));
			if(score.substring(16)>0){
				document.getElementById("sentimentBox1").innerHTML = `<div style="color:green;text-align: center; font-size: 20px"><strong>Good Emotion! Keep It Up!</strong></div>`
			}else {
				document.getElementById("sentimentBox1").innerHTML = `<div style="color: red; text-align: center; font-size: 20px"><strong>Need A Bit More Enthusiasm!</strong></div>`
			}
		}

			$.ajax({
				'url' : 'http://localhost:3000/api/sentiment',
				'type' : 'GET',
				'data': {
					'divContent': divContent
				},
				dataType:'json',
				'success': function(data){
					
					document.getElementById("sentimentBox").innerHTML = 
					`<ul>
						<li style="font-weight: bold">${data.Score}</li>
						<li style="font-weight: bold">${data.Magnitude}</li>
					</ul>`
					enthus(data.Score);
					
					
				},
				'error' : function(request, error){
					console.log("Request: "+JSON.stringify(request));
				}
			
		});

		


		


	});

}, 100);

var transcriptObj;

function sendTranscript(){
	var divHTMLContent = document.getElementById("transcriptionBox").innerHTML;
	
	$.ajax({
		'url' : 'http://localhost:3000/api/transcripts',
		'type' : 'GET',
		'data': {
			'divContent': divHTMLContent
		},
		dataType:'json',
		'success': function(data){
			console.log([...data]);
			transcriptObj = data;
			document.getElementById("transcriptHistoryBox").innerHTML = 
					`
		${([...data]).map(a => {return `<div>${a.number}</div>`} )}
						
					`
			
			
		},
		'error' : function(request, error){
			console.log("Request: "+JSON.stringify(request));
		}
		
});
	
}

document.getElementById("speaker-labels").addEventListener("click", showDOM);


function showDOM(){
	document.getElementById("mainContainer").style.display = "block";
	document.getElementById("toggleSideButton").style.display  = "block";
	document.getElementById("viewTranscriptsButton").style.display  = "block";
	document.getElementById("getStartedButton").style.display  = "none";
}


document.getElementById("customButton").addEventListener("click", addWord);
document.getElementById("viewTranscriptsButton").addEventListener("click", sendTranscript);

//Function to add custom word
function addWord(){

	var proceed = true;



	for (var i = 0; i<customArr.length; i++){
		if(document.getElementById("wordEntry").value.toLowerCase() == customArr[i].text.toLowerCase()){
			proceed = false;
			alert("Word/Phrase Already Inserted");
		}
	}
	
	if(proceed == true){
		var holder = document.getElementById("customWordHolder");

		var word = document.createElement('div');

		var textValue = document.getElementById("wordEntry").value;
		var colorValue = document.getElementById("colorPicker").value;


		word.textContent = textValue
		word.style.backgroundColor = colorValue;

		word.setAttribute('class', 'customWords');

		var newWord = new customWord(textValue, colorValue);

		if(customArr.length == 0){
			customArr.push(newWord);
		}else{
			customArr.push(newWord);
			sortArr(customArr, newWord);
		}

		var closeButton = document.createElement('button');
		closeButton.textContent = "x";
		closeButton.setAttribute('class', 'closeButtonStyle');

		word.appendChild(closeButton);
		holder.appendChild(word);
	}
	
}

function removeWord (removedWord){
	var wordVal = removedWord.substring(0, removedWord.length-1);
	
	for(var i = 0; i<customArr.length; i++){
		if(customArr[i].text == wordVal){
			customArr.splice(i,1);
			console.log(customArr);
		}
	}

}



//Function to sort array of custom words
function sortArr(arr, word){

	var index = 1;

	while((index<arr.length) && arr[arr.length-index].text.length > arr[arr.length-index-1].text.length) {
		var temp = arr[arr.length-index];
		arr[arr.length-index] = arr[arr.length-index-1];
		arr[arr.length-index-1] = temp;
		index++;
	}

	console.log(arr);

}

var theArr = [];
var superarray = [];
var uniqSuperArr = [];
var thesaurusWordsArray = [];

setInterval(function(){

	var theArr = document.getElementById("transcriptionBox").innerText.split(/[ .]+/);
	var uniqArr = [... new Set(theArr)];
	var theObjArr = [];

	for(var i = 0; i<uniqArr.length; i++){
		var occurrences = 0;
		var word = uniqArr[i];
		for(var j = 0; j<theArr.length; j++){

			if(theArr[j] == word){
				occurrences++;
			}

		}
		
		theObjArr.push({word: uniqArr[i], count:occurrences});
		
	}


	for(var i = 0; i<theObjArr.length; i++){
		if(theObjArr[i].count>=3){
			document.getElementById("thesaurusWordHolder").innerHTML = theObjArr[i].word;
			document.getElementById("returnWord").dispatchEvent(new Event('input'));
			changedWord = theObjArr[i].word;
		}
		
	}

	// console.log(superarray);
	document.getElementById("thesaurusBox").innerHTML = thesaurusWordsArray.join("\n");
	document.getElementById("thesaurusBoxSide").innerHTML = thesaurusWordsArray.join("\n");
	

}, 1);

var changedWord;

function AppendNewThesaurusWord(){
	if(!superarray.includes(document.getElementById("returnWord").value) && document.getElementById("returnWord").value != ""){
		superarray.push(document.getElementById("returnWord").value);
		thesaurusWordsArray.push("<div><h3 class='theWord'>" + changedWord + ":</h3><div id='thesaurusOutputBox'>" + document.getElementById("returnWord").value + "</div></div>");
	}


	
}

document.getElementById("returnWord").addEventListener("input", AppendNewThesaurusWord);

var toggle = false;

function ToggleSideView(){
	if(!toggle){
		document.getElementById('sideViewBox').style.display = "flex";
		document.getElementById('topBottomBox').style.display = "none";
		toggle = true;
	}else {
		document.getElementById('sideViewBox').style.display = "none";
		document.getElementById('topBottomBox').style.display = "block";
		toggle = false;
	}
}

document.getElementById("toggleSideButton").addEventListener("click", ToggleSideView);



