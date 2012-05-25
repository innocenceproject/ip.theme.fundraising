function redirect(list) {
	var chosenIndex = list.selectedIndex;
	var redirectURL = list.options[chosenIndex].value;
	location.href = redirectURL;
	return true;
}

// turn on Flash
function on() {
   var itm = document.getElementById('myFlashDiv');
   var itm2 = document.getElementById('myImgDiv');
   itm.style.visibility="visible";
   itm2.style.visibility="hidden";
}

// turn off Flash
function off() {
   var itm = document.getElementById('myFlashDiv');
   var itm2 = document.getElementById('myImgDiv');
   itm.style.visibility="hidden";
   itm2.style.visibility="visible";
}

// turn on Spanish Popup
function popSpanish() {
   var itm = document.getElementById('spanishPop');
   itm.style.visibility="visible";
}

// turn off Spanish Popup
function unpopSpanish() {
   var itm = document.getElementById('spanishPop');
   itm.style.visibility="hidden";
}

// turn on Spanish Content
function toggleSpanish() {
	var itm = document.getElementById('Englishcontent');
	var itm2 = document.getElementById('Spanishcontent');
	var itm4 = document.getElementById('EnglishWord');
	var itm3 = document.getElementById('SpanishWord');

	if (itm.style.display == "none") {
		itm2.style.display="none";
		itm4.style.display="none";
		itm.style.display="block";
		itm3.style.display="block";
	}
	else {
		itm.style.display="none";
		itm3.style.display="none";
		itm2.style.display="block";
		itm4.style.display="block";
	}
}


//E-Mail this page
function mailpage() {
	mail_str = "mailto:?subject=Check out the " + document.title;
	mail_str += "&body=I thought you might be interested in the " + document.title;
	mail_str += ". You can view it at, " + location.href; 
	location.href = mail_str;
}
