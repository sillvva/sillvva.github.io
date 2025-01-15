const parseURL = function (url) {
	let parser = document.createElement("a"),
		searchObject = {},
		queries,
		split;
	// Let the browser do the work
	parser.href = url;
	// Convert query string to object
	queries = parser.search.replace(/^\?/, "").split("&");
	if (parser.search.length > 0) {
		for (let i = 0; i < queries.length; i++) {
			split = queries[i].split("=");
			searchObject[split[0]] = split[1];
		}
	}
	return {
		protocol: parser.protocol,
		host: parser.host,
		hostname: parser.hostname,
		port: parser.port,
		pathname: parser.pathname,
		search: parser.search,
		searchObject: searchObject,
		hash: parser.hash,
	};
};

const inPages = function (...pages) {
	const url = parseURL(window.location.href);
	return pages.find((page) => url.pathname.indexOf(page) === 0);
};

const addStyle = function (newStyle) {
	let styleElement = document.getElementById("styles_js");
	if (!styleElement) {
		styleElement = document.createElement("style");
		styleElement.type = "text/css";
		styleElement.id = "styles_js";
		document.getElementsByTagName("head")[0].appendChild(styleElement);
	}
	styleElement.appendChild(document.createTextNode(newStyle));
};

const insertAfter = function (referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

const jump = function (h) {
	location.href = "#" + h;
};

const focusInput = function (selector) {
	window.ktimer = setInterval(() => {
		const input = document.querySelector(selector);
		input.focus();
		input.select();
		if (input === document.activeElement) {
			clearInterval(window.ktimer);
		}
	}, 100);
};