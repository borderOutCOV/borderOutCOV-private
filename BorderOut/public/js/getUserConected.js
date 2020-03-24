

function WhoAmI() {
       return new Promise(function(resolve, reject){
           $.ajax({
               url: '/getUserConected',
               success: function(data) {
                 if (data != undefined)
                 {
                   $("#mySelf").val(data);
                   resolve(data);
                 }
                 else
                 {
                   resolve($("#mySelf").val());
                 }
               },
               error: function(error) {
                   showNotification("Hubo un error en el sistema","r");
                   console.log(error);
                   resolve(false);
               }
           });
       });
   }
