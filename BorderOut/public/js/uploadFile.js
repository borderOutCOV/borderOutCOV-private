$(document).ready(function()
{
  fileListener();
});




function fileListener()
{
  document.getElementById("foto").addEventListener('change', readFile, false);
}
function readFile (evt)
{
  var files = evt.target.files;
  var file = files[0];
  //Declarando un reader para leer el archivo
  var reader = new FileReader();
  console.log(file);
  //Validando si existe el campo type
  var fileType;
  if(file!=null)
  {
    reader.readAsDataURL(file);
    reader.onload = function ()
    {
      document.getElementById("foto_data").value= reader.result;
      document.getElementById("imagen").src= reader.result;
      /*
      let blob = new Blob([reader.result], {type: 'text/plain'});
      console.log(blob);
      document.getElementById("foto_data").value= blob;


      var reader2 = new FileReader();
      reader2.readAsText(blob);
      reader2.onload = function() {
        console.log(reader2.result);
      };
      */
    };
  }
}
