$(document).ready(function()
{
  fieldListener();
});

function fieldListener()
{
  document.getElementById("amigo").addEventListener('change', getFieldValue, false);
}
function getFieldValue (evt)
{
  alert("amigo");
}
