// Tabs: each nav link points at a #section. Without JS every section shows.
(function () {
	var links = document.querySelectorAll('nav.tabs a[href^="#"]');
	var ids = Array.prototype.map.call(links, function (a) { return a.getAttribute('href').slice(1); });

	function show(id, push) {
		if (ids.indexOf(id) === -1) id = ids[0];
		ids.forEach(function (other, i) {
			var on = other === id;
			document.getElementById('tab-' + other).hidden = !on;
			links[i].classList.toggle('selected', on);
			if (on) links[i].setAttribute('aria-current', 'page');
			else links[i].removeAttribute('aria-current');
		});
		if (push) history.replaceState(null, '', '#' + id);
	}

	Array.prototype.forEach.call(links, function (a) {
		a.addEventListener('click', function (e) {
			e.preventDefault();
			show(a.getAttribute('href').slice(1), true);
		});
	});

	window.addEventListener('hashchange', function () { show(location.hash.slice(1)); });
	show(location.hash.slice(1));
})();
