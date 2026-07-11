/* Ashot Pahlevanyan — site behaviour: theme, scroll reveal, footer year */
(function () {
	'use strict';

	// --- theme toggle (persisted) ------------------------------------------
	var root = document.documentElement;
	var stored = null;
	try { stored = localStorage.getItem('theme'); } catch (e) {}
	if (stored === 'light' || stored === 'dark') {
		root.setAttribute('data-theme', stored);
	}

	function currentTheme() {
		var attr = root.getAttribute('data-theme');
		if (attr) return attr;
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	var toggle = document.getElementById('themeToggle');
	if (toggle) {
		toggle.addEventListener('click', function () {
			var next = currentTheme() === 'dark' ? 'light' : 'dark';
			root.setAttribute('data-theme', next);
			try { localStorage.setItem('theme', next); } catch (e) {}
		});
	}

	// --- reveal on scroll ---------------------------------------------------
	var reveals = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window && reveals.length) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('in');
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
		reveals.forEach(function (el) { io.observe(el); });
	} else {
		reveals.forEach(function (el) { el.classList.add('in'); });
	}

	// --- footer year --------------------------------------------------------
	var y = document.getElementById('year');
	if (y) y.textContent = String(new Date().getFullYear());
})();
