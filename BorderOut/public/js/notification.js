var divNotification = $('#Notifications');

function showNotification(Message,_color){
    var html5 = '';
    var color = '';
    if(_color=="r"){
        color="danger";
    }else if(_color=="g"){
        color="success";
    }
    else if(_color=="b"){
        color="primary";
    }
  html5 +=`<div id="modal" class="modal" tabindex="-1" role="dialog">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Notificacion</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div class="alert alert-`+color+` role="alert">
    <strong>`+Message+`</strong>
  </div>
    </div>
  </div>
</div>
</div>`;
    divNotification.html(html5);
    $('#modal').modal('show');
}