/*
jetEngine => js element loader
*/

// _(elementName, elementNode)
function _(eName = null, eNode = 0) {
	if(eName == null){
		return;
	}
	try{
		return document.querySelectorAll(eName)[Math.round(eNode)];
	} catch {}
}
// Element.Fade(time, percentage, complete)
HTMLElement.prototype.Fade = function(time = 0.4, percentage = 0, complete){
	var opacity = this.style.opacity;
	if(opacity == ""){
		opacity = 100
	} else {
		opacity = Math.round(eval(opacity)*100);
	}
	var percentage = Math.round(percentage);
	if(opacity > percentage){
		var operation = -1;
		var Dispute = opacity - percentage;
	} else if(opacity < percentage && percentage <= 100){
		var operation = +1;
		var Dispute = percentage - opacity;
	} else {
		return;
	}
	var operationTime = time * 1000 / Dispute;
	var thisFanc = this;
	var interval = setInterval(function(){
		opacity += operation
		thisFanc.style.opacity = opacity.toString().concat("%");
		if(opacity == percentage){
			clearInterval(interval)
			if(typeof(complete) === "function"){
				complete(thisFanc)
			}
		}
	}, operationTime)
	return this;
}
// _(Element).Load(pageLink, elementInPage, complete,contentOrElement,eNode, deleteContent)
HTMLElement.prototype.Load = function(pageLink = '', elementInPage = '', complete, cOe = true, eNode = 0, deleteContent = true){
	if(pageLink == '' || 
	elementInPage == ''){
		return;
	}
	var thisFanc = this;
	var request;
	if(window.XMLHttpRequest){
		request = new XMLHttpRequest;
	} else {
		request = new ActiveXObject;
	}
	request.open('GET', pageLink, true);
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			var temp = document.createElement('span');
			temp.style.display = 'none';
			document.body.appendChild(temp);
			temp.innerHTML = request.response;
			var EFL = temp.querySelectorAll(elementInPage)[eNode];
			if(deleteContent){
				thisFanc.innerHTML = '';
			}
			if(cOe){
				thisFanc.innerHTML += EFL.innerHTML;
			} else {
				thisFanc.appendChild(EFL);
			}
			document.body.removeChild(temp)
			if(typeof(complete) === "function"){
				complete(thisFanc)
			}
		}
	}
	request.send();
	return this;
}