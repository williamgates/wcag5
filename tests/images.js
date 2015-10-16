var require = patchRequire(require);
		exports.Run = function(){
			return casper.evaluate(function() {
		var errorList = [];
				//Iterate through images to check if they have alt text
 					 $("img").each(function(i){
						 //Instantiate an error object just in case
						 var offset = $(this).offset();
						 var err = {
					 coords:{left:offset.left, top:offset.top, width:$(this).width(), height:$(this).height()},
					 url:document.URL,
				 html:$(this).prop("outerHTML"),
				 wcag:"1.1.1",
				 level:"0"
				 };
				 
						 			 if ($(this).attr("alt")) {
						 var txt = $(this).attr("alt");
						 
						 //If the image has no text
				 if (txt.length > 0)  { //if not empty - empty is ok
if (txt.trim() == "") { //white space
err.level = "1";
err.message = "Alt text consists of only white space";
} //if white space

if (txt.trim().length > 150) { //long alt
err.level = "2";
err.message = "Alt text is unusually long. Check that it is as short and descriptive as possible.";
} //if too long
} //if alt attribute contains text
									 } else {
										 err.level = "1";
										 err.message = "Image has no alt attribute";
					 } //if image has an alt
			 
					 if (err.level != "0") {
					 errorList.push(err);
			 } //if no text in the image
 }); //iterate images
 return errorList;
		}); //evaluate
		}; //export function
		