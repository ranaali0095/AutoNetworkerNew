   //save account to table_message_template

   function saveTableMessageTemplate(docs) {
       return table_message_template.put(docs);
   }


   ///////////////////////////////////////////////////////////////////////
   //    function getTableMessageTemplate(name) {
   //        table_message_template.get(name).then(function(result) {
   //            // handle doc
   //            console.log(result);
   //            return result;
   //        }).catch(function(err) {
   //            console.log(err);
   //            return false;
   //        });
   //    }

   //    function getArrayTableMessageTemplate() {
   //        table_message_template.allDocs({
   //            include_docs: true
   //        }).then(function(result) {
   //            // handle result
   //            console.log(result);
   //            return result;
   //        }).catch(function(err) {
   //            console.log(err);
   //            return false;
   //        });
   //    }


	 function getDataTableMessageTemplate(idVal) {
		 return table_message_template.get(idVal);
	 }


	 function getAllTableMessageTemplate() {
		 return table_message_template.allDocs({
			 include_docs: true
		 });
	 }