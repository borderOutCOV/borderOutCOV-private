
window.onload = function() {
  $.ajax({
    url: '/myRequests',
    success: function(data)
    {
      if (data.length > 0)
      {
        document.getElementById("solicitudes").style.color = 'blue';
      }
    }
  });

};
