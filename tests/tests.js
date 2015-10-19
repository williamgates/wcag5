var require = patchRequire(require);
var links = require('tests/links.js');
var images  = require('tests/images.js');
var lang  = require('tests/lang.js');
var forms  = require('tests/forms.js');
var ids = require('tests/ids.js');
var misc = require('tests/misc.js');
var results = {errors:[], pageTitles:[]};

			function LogResults(resList) {
	casper.each(resList, function(self, tmp){
		if (typeof tmp.coords == "object") {
		//this.ScreenShot(tmp.coords);
		delete tmp.coords;
		} //if screenshot required
		
results.errors.push(tmp);
					}); //each
} //LogResults

exports.Results = function(){ return results };

exports.Run = function(){
	results.pageTitles.push({
		url:casper.getCurrentUrl(),
title:casper.getTitle() || "No page title"
	});
LogResults(links.Run());	
LogResults(images.Run());	
LogResults(lang.Run());	
LogResults(forms.Run());	
LogResults(ids.Run());
LogResults(misc.Run());
}; //Run
