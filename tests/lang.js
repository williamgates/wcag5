var require = patchRequire(require);
		exports.Run = function(){
			return casper.evaluate(function() {
		var errorList = [];
 					 if (!($("html").is("[lang]"))){
						 //Instantiate an error object just in case
						 var err = {
					 url:document.URL,
				 html:"",
				 wcag:"3.1.1",
				 level:"1",
				 message:"No language has been defined for this page"
				 }; //error object
				 
				 errorList.push(err);
					 } //if
						 
 return errorList;
		}); //evaluate
		}; //export function
		