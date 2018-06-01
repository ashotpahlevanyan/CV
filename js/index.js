(function() {

	'use strict';
	let wSize;
	let upToTop = document.querySelector('.upToTop');

	document.onreadystatechange = function() {
		if(document.readyState === 'interactive') {
			domContentLoaded();
		} else if(document.readyState === 'complete') {
		}
	}

	function domContentLoaded() {
		window.addEventListener('scroll', myFunction);
		upToTop.addEventListener('click', function(e) {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});

		function myFunction() {
			if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
				if(hasClass(upToTop, 'hide')) {
					upToTop.classList.remove('hide');
				}
			} else {
				if(!hasClass(upToTop, 'hide')) {
					upToTop.classList.add('hide');
				}
			}
		}

		let download = document.querySelector('#Download');
		download.addEventListener('click', function(e) {
			e.preventDefault();
			window.print();
		});
	}

	function hasClass(element, cls) {
		return (' ' + element.className + '').indexOf(' ' + cls + '') > -1;
	}

})();