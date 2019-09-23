

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
                   alert("Hubo un error en el sistema");
                   console.log(error);
                   resolve(false);
               }
           });
       });
   }
