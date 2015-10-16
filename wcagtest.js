var casper = require('casper').create({
	clientScripts: ["includes/jquery-min.js"],
	pageSettings: {
 loadPlugins: false,
 web_security:false
 }
});
var utils = require('utils');
var system = require('system');
var spider = require('helpers/spider');
var tests = require('tests/tests');
var results=[];
var running = true;

function CrawlAndTest(){
	var pageToTest;
	casper.then(function(){
		pageToTest = spider.NextPage();
	}); //step
	casper.then(function(){
		if (pageToTest == true) {
		tests.Run();
		} //if
		}); //then
		casper.then(function(){
			if (pageToTest == true) {
	CrawlAndTest();	
			} //if
	}); //then
	casper.then(function(){
	return true;
	}); //then
} //CrawlAndTest

casper.start();
casper.then(function(){
spider.Run(system.args[4], system.args[5]);
});
casper.then(function(){
CrawlAndTest();
}); //then

casper.run(function() {
	//utils.dump(tests.Results());
 	//utils.dump({finished:"Yes"});
 	console.log(JSON.stringify(tests.Results()));
 	this.exit();
});