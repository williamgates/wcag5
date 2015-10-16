var require = patchRequire(require);
	var results=[], pendingUrls = [], visitedUrls = [];
	var spidered=0, toSpider=1;
	
	function absoluteUri(base, href) {

	// Parse a URI and return its constituent parts
	function parseUri(url) {
		var match = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
		return (match ? { href: match[0] || '', protocol: match[1] || '', authority: match[2] || '', host: match[3] || '', hostname: match[4] || '',
		                  port: match[5] || '', pathname: match[6] || '', search: match[7] || '', hash: match[8] || '' } : null);
	}

	// Resolve dots in the path
	function resolvePathDots(input) {
		var output = [];
		input.replace(/^(\.\.?(\/|$))+/, '')
		     .replace(/\/(\.(\/|$))+/g, '/')
		     .replace(/\/\.\.$/, '/../')
		     .replace(/\/?[^\/]*/g, function (part) { part === '/..' ? output.pop() : output.push(part); });
		return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
	}

	// Parse base and href 
	href = parseUri(href || '');
	base = parseUri(base || '');

	// Build and return the URI 
	return !href || !base ? null : (href.protocol || base.protocol) +
	       (href.protocol || href.authority ? href.authority : base.authority) +
	       (resolvePathDots(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname))) +
	       (href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) + href.hash;

} //function absoluteUri
	
	function AddUrl(newUrl){
		if (pendingUrls.indexOf(newUrl) == -1 && visitedUrls.indexOf(newUrl) == -1) {
		pendingUrls.push(newUrl);
		} //if
	} //AddUrl
	
	function NextUrl(){
		if (pendingUrls.length > 0){
		var url = pendingUrls.shift();
		visitedUrls.push(url);
		spidered++;
		return url;
		} else {
			return false;
		} //if
	} //NextUrl

function NextPage(){
			var url = NextUrl();
if (spidered > toSpider || url === false) {
	return false;
} else { //if an URL was sent to this page
// Open the URL
	casper.thenOpen(url);
	casper.then(function(){
		if (casper.status().currentHTTPStatus == 200){
// Find links present on this page
		var links = casper.evaluate(function() {
			var links = [];
			Array.prototype.forEach.call(__utils__.findAll('a'), function(e) {
				links.push(e.getAttribute('href'));
			}); //each
			return links;
			}); //evaluate	
			
		// Add newly found URLs to the stack
		var baseUrl = casper.getGlobal('location').origin;
		Array.prototype.forEach.call(links, function(link) {
			var newUrl = absoluteUri(baseUrl, link);
			if (newUrl.indexOf(baseUrl) === 0) {
AddUrl(newUrl);
			} //if new url
		}); //each			
			} //If status = 200
	}); //then
} //if there's an URL to open
return true;
	} //NextPage
	
	function Run(startUrl, pagesToCrawl){
		if (startUrl !== ""){
			toSpider = pagesToCrawl;
AddUrl(startUrl);
return true;
		} else { //If no URL sent
		return false;
} //if an URL was sent to this function
	} //function Run
	
	exports.NextPage = NextPage;
	exports.Run = Run;