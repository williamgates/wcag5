var require = patchRequire(require);
		exports.Run = function(){
			return casper.evaluate(function() {
		var errorList = [];
				//Iterate through form inputs to check if they have labels
 					 $("input, textarea, select").each(function(i){
						 //Instantiate an error object just in case
						 var err = {
					 url:document.URL,
				 html:$(this).prop("outerHTML"),
				 level:"0"
				 }; //error object
				
						 if (!($(this).is("[id]"))){
							 err.wcag = "4.1.1";
				err.level = 1;
err.message = "Form element has no ID so can't have an associated label";				
						 } else { //if element does have an ID
						 var id = $(this).attr("id");
						 var lbl = $("label[for='" + id + "']");
						 if ($(lbl).length === 0) { //No label
							 err.wcag = "4.1.2";
				err.level = 1;
err.message = "Form element has no associated label";											 
						 } //if no label
						 } //if no ID
 }); //iterate form inputs
 
 return errorList;
		}); //evaluate
		}; //export function
		