var require = patchRequire(require);
		exports.Run = function(){
			return casper.evaluate(function() {
		var errorList = [], ids=[], dupes=[];
				//Iterate through elements with an ID attribute
 					 $([id]).each(function(i){
						 ids.push($(this).attr("id"));
 }); //iterate form inputs
 
 //Now check the IDs for duplication but only if more than one
	 while (ids.length > 1){
		 var id = ids[0], dupe=0;
		 ids = ids.splice(0, 1);
		 while (ids.indexOf(id) > -1){
			 ids = ids.splice(ids.indexOf(id), 1);
			 dupe++;
		 } //while
		 
		 if (dupe > 0) {
			 dupe++;
			 		 //Instantiate an error object
						 errorList.push({
					 url:document.URL,
				 html:"",
				 result:"1",
				 wcag:"4.1.1",
				 message:"Duplicate ID's: " + dupe + " elements share the same ID of '" + id + "'"
				 }); //error object
				 dupe=0;
		 } //if dupe
	 } //while
 
 return errorList;
		}); //evaluate
		}; //export function
		