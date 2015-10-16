var require = patchRequire(require);
		exports.Run = function(){
			return casper.evaluate(function() {
		var errorList = [];
				//Iterate through links to check if they have any text
 					 $("a").each(function(i){
						 			 var txt = $(this).text().trim();
			 
			 //If the link has no text
			 if (txt == "") {
				 //Instantiate an error object
				 var offset = $(this).offset();
				 var err = {
					 coords:{left:offset.left, top:offset.top, width:$(this).width(), height:$(this).height()},
					 url:document.URL,
				 html:$(this).prop("outerHTML")
				 };
				 
			 //Iterate through any images inside the link looking for alt text
				 $(this).children("img").each(function(j){
					 if ($(this).attr("alt")) {
						 txt += $(this).attr("alt").trim();
					 } //if image has an alt
				 }); //iterate images within a link
				 
				 if (txt == "")  {
					 err.wcag = "2.4.4";
err.level = "1";
err.message = "Llink has no text";
} else { //if the link has alt text
err.wcag = "1.1.1";
err.level = "2";
err.message = "Check that alt text for linked image is appropriate: " + txt;
					 } //if no alt text
					 
					 errorList.push(err);
			 } //if no text in the link
 }); //iterate links
 return errorList;
		}); //evaluate
		}; //export function
		