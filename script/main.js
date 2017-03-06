$(document).foundation();
(function(){
	var chantryImages = document.querySelectorAll('nav li'),
		chantryDesc = document.querySelectorAll('.chantry-section p'),
		chantryHeader = document.querySelector('.chantry-header'),
		chantryIsl = document.querySelector('.chantry');
	
	function makeRequest() {
	    // instantiate the httpRequest object (this is a built-in browser object with defined functionality)
	    httpRequest = new XMLHttpRequest();

	    // if it's an old browser that doesn't have this object, then quit and show a message
	    if (!httpRequest) {
	      alert('Giving up :( Cannot create an XMLHTTP instance');
	      return false;
	    }

	    // assign an event handler to the readystatechange event, open a request, and through a request for the text document
	    httpRequest.onreadystatechange = chantryInfo;
	    httpRequest.open('GET', 'includes/chantryIsland.php' + "?chantry=" + this.id);
	    httpRequest.send();
	}

	function chantryInfo() {

		if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
			// parse stringified result
			chantryData = JSON.parse(httpRequest.responseText);

			[].forEach.call(document.querySelectorAll('.hidden'), function(item) {
				item.classList.remove('hidden');
			});

			chantryIsl.src = 'images/' + chantryData.bgImage + '.jpg';
		}
	}

	[].forEach.call(chantryImages, function(el) {
		el.addEventListener("click", makeRequest, false);
	});
})();