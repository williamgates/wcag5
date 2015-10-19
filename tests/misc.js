var require = patchRequire(require);
		exports.Run = function(){
			return casper.evaluate(function() {
		var errorList = [];
		//Headings
				//Iterate through elements with a header class
 					 $("[class='heading'], [class='header']").each(function(i){
						 //If this element contains  100 charcters or less of text it might be a heading
						 if ($(this).text().length <= 100){
						 	 //Instantiate an error object
						 errorList.push({
					 url:document.URL,
				 html:$(this).prop("outerHTML"),
				 result:"2",
				 wcag:"1.3.1",
				 message:"Check whether this element should be marked up as a heading"
				 }); //error object
						 } //If this element contains  100 characters or less of text it might be a heading
 }); //iterate elements with header class
 
 //Check that real headings aren't too long
 $("h1", "h2", "h3", "h4", "h5", "h6").each(function(i){
	if ($(this).text().length > 100){
		 errorList.push({
					 url:document.URL,
				 html:$(this).prop("outerHTML"),
				 result:"2",
				 wcag:"1.3.1",
				 message:"This heading contains a lot of text and may incorrectly enclose subordinate content"
				 }); //error object
	} //too long heading text	
 }); //Check that real headings aren't too long
 
 //Lists
 //Look for bullet images
 $("img[src*='bullet']").parent().each(function(i){
	 errorList.push({
					 url:document.URL,
				 html:$(this).prop("outerHTML"),
				 result:"2",
				 wcag:"1.3.1",
				 message:"This element contains a bullet image so may be part of a visual list that's not marked up"
				 }); //error object
 }); //Look for bullet images
 
 //Focus outline
 //Find focusable elements with outline explicitly set to none
 $("input[type!='hidden'], select, textarea, a").each(function(i){
	 errorList.push({
					 url:document.URL,
				 html:$(this).prop("outerHTML"),
				 result:"2",
				 wcag:"1.4.3",
				 message:"The OUTLINE for this element has been set to 'none'. Check that keyboard focus is visible"
				 }); //error object
 }); //Find focusable elements with outline set to none
 
 return errorList;
		}); //evaluate
		}; //export function
		