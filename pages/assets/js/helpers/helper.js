let db = require('./helper-db.js');

var self = module ? module.exports = {
	toDataURL: async ( url ) => {
		let imageUrl = await new Promise(resolve => {
			var xhr = new XMLHttpRequest();
			xhr.onload = function() {
				var reader = new FileReader();
				reader.onloadend = function() {
					// console.log('inside toDataURL',reader.result)
					resolve(reader.result);
				};
				reader.readAsDataURL(xhr.response);
			};
			xhr.open('GET' , url);
			xhr.responseType = 'blob';
			xhr.send();
		});
		return imageUrl;
	} ,
	retrieveAndSaveCookies: async ( url , cookies = null ) => {
		let session = document.querySelector('webview').getWebContents().session;
		if ( !cookies ) {
			cookies = await new Promise(resolve => {
				session.cookies.get({ url: url } , ( error , cookies ) => {
					resolve(JSON.stringify(cookies));
				});
			});
		}
		let docCookies = {};
		docCookies._id = constants.DOC_TYPE.COOKIES;
		docCookies.value = cookies;
		db.saveCollection(docCookies);
		return cookies;
	} ,
	checkGetAllPagesChecked: ( $startButton ) => {
		let radioButton = $startButton.parents('.panel-body').
			find('.checkbox input:checked')
			, radioButtonId = radioButton.length > 0 ? radioButton.get(0).id : ''
			, radioButtonChecked = radioButton.length > 0;
		return radioButtonChecked && radioButtonId == 'getProfAll';
	} ,
	showMessage: (
		msg , targetOrSelector = '.main' , first = false , timeout = 4000 ) => {
		let msgEl = document.createElement('div');
		msgEl.setAttribute("class" , "alert alert-warning alert-dismissible show");
		msgEl.setAttribute("role" , "alert");
		msgEl.style.cssText = 'margin: 0 0 0 1em;';
		msgEl.style.width = '95%';
		let closeEl = document.createElement('button');
		closeEl.setAttribute("type" , "button");
		closeEl.setAttribute("data-dismiss" , "alert");
		closeEl.setAttribute("class" , "close");
		closeEl.setAttribute("aria-label" , "Close");
		let spanEl = document.createElement('span');
		spanEl.setAttribute("aria-hidden" , "true");
		spanEl.textContent = '×';
		closeEl.appendChild(spanEl);
		msgEl.appendChild(closeEl);

		let strongEl = document.createElement('strong');
		strongEl.textContent = 'Info! ';
		msgEl.appendChild(strongEl);
		msgEl.appendChild(document.createTextNode(msg));
		first ? $(targetOrSelector).prepend(msgEl) : $(targetOrSelector).
			append(msgEl);

		$('.alert').animate({ "left": "-=50px" } , "slow");
		setTimeout(() => {
			$('.alert').remove();
		} , timeout);
	}
} : null;
//TODO: remove when production
global.helper = self;