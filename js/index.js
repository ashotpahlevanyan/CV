(function() {

'use strict';
let wSize;
let upToTop = document.querySelector('.upToTop');


document.onreadystatechange = function() {
	if(document.readyState === 'interactive') {
	} else if(document.readyState === 'complete') {
	}
}
function domContentLoaded() {
	wSize = window.innerWidth 
				|| document.documentElement.clientWidth 
				|| document.body.clientWidth;
}

window.scroll(myFunction);

 function myFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.querySelector(".upToTop").className = 'center noPrint upToTop';
    } else {
        document.querySelector(".upToTop").className = 'center noPrint upToTop hide';
    }
}

//upToTop.addEventListener('click', runScroll, false);

// function scrollToTop() {
// 	verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
// 	element = $('body');
// 	offset = element.offset();
// 	offsetTop = offset.top;
// 	$('html, body').animate({scrollTop: offsetTop}, 1000, 'linear');
// }
// 

// function runScroll() {
//   scrollTo(document.body, 0, 600);
// }
// var scrollme;
// // scrollme = document.querySelector("html, body");
// // scrollme.addEventListener("click", runScroll, false)

// function scrollTo(element, to, duration) {
//   if (duration <= 0) return;
//   var difference = to - element.scrollTop;
//   var perTick = difference / duration * 10;

//   setTimeout(function() {
//     element.scrollTop = element.scrollTop + perTick;
//     if (element.scrollTop == to) return;
//     scrollTo(element, to, duration - 10);
//   }, 10);
// }

})();