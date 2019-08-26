function WhoAmI() {
  var html5 = '';
  $.ajax({
      url: '/getUserConected',
      success: function(data)
      {
          if (data != undefined)
          {
              //$("#username").val(data[0].username);
              $("#mySelf").val(data);
              
          }
          else
          {
            $("#mySelf").val(":c");
            alert("Algo esta mal");
          }
      }
  })
}
WhoAmI();
