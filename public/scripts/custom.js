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
var like = new customWord("like", "SlateBlue");
var basically = new customWord("basically", "Violet");

var customArr = [basically, like, uhh, umm, uh, um];

//Continous Pinging Function
setInterval(function(){

	var currColor;
	var currWord;

	var text = document.getElementById("transcriptText").innerText;

	//Looking for keywords

	for(var i = 0; i<text.length; i++){ 			

		for(var j = 0; j<customArr.length; j++){

		currWord = customArr[j];
		currColor = currWord.color;

		var wordLength = currWord.text.length;

		if (text.substring(i, i+wordLength) == customArr[j].text && text.substring(i+wordLength, i+wordLength+1) == " "){
			if(indexArr.length == 0 || indexArr[indexArr.length-1] < i){
				indexArr.push(i);
				insertKeyword(text, currColor, currWord);
			}
			
		}

		}

	}

	display(text, currWord);

}, 100);



//Displaying Paragraph
function display(text, currWord){

	if(textArr.length == 0){
		document.getElementById("transcriptionBox").innerHTML = text;
		document.getElementById("transcriptionBoxSide").innerHTML = text;
	}else if (text.length > indexArr[indexArr.length-1]+currWord.text.length){
		var overflow = text.substring(indexArr[indexArr.length-1]+currWord.text.length,text.length);
		document.getElementById("transcriptionBox").innerHTML = textArr.join(" ") + overflow;
		document.getElementById("transcriptionBoxSide").innerHTML = textArr.join(" ") + overflow;
	}else{
		document.getElementById("transcriptionBox").innerHTML = textArr.join(" ");
		document.getElementById("transcriptionBoxSide").innerHTML = textArr.join(" ");
	}

}



//Function to Insert Keyword with Color Styling Attributes Appended
function insertKeyword(text, currColor, currWord){

	var index = indexArr.length-1;

	if(index == 0){
		textArr.push(text.substring(0 , indexArr[index]) + ' <span class = "highlightWord" style="background-color:' + currColor + '">' +  text.substring(indexArr[index] , indexArr[index]+currWord.text.length) + '</span>');
	}else{ 
		textArr.push(text.substring(indexArr[index-1]+currWord.text.length , indexArr[index]) + ' <span class = "highlightWord" style="background-color:' + currColor + '">' +  text.substring(indexArr[index] , indexArr[index]+currWord.text.length) + '</span>');
	}

}


document.getElementById("speaker-labels").addEventListener("click", showDOM);


function showDOM(){
	document.getElementById("mainContainer").style.display = "block";
	document.getElementById("toggleSideButton").style.display  = "block";
	document.getElementById("getStartedButton").style.display  = "none";
}


document.getElementById("customButton").addEventListener("click", addWord);

//Function to add custom word
function addWord(){

	var proceed = true;



	for (var i = 0; i<customArr.length; i++){
		if(document.getElementById("wordEntry").value == customArr[i].text){
			proceed = false;
			alert("Word/Phrase Already Inserted");
		}
	}
	
	if(proceed == true){
		var holder = document.getElementById("customWordHolder");

		var word = document.createElement('div');

		var textValue = document.getElementById("wordEntry").value;
		var colorValue = document.getElementById("colorPicker").value;


		word.textContent = textValue;
		word.style.backgroundColor = colorValue;

		word.setAttribute('class', 'customWords');

		var newWord = new customWord(textValue, colorValue);

		if(customArr.length == 0){
			customArr.push(newWord);
		}else{
			customArr.push(newWord);
			sortArr(customArr, newWord);
		}

		holder.appendChild(word);
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


