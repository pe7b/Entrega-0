//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const obj = {name: "",ape: "", age: null, email: "", tel: ""};
var perfil = window.localStorage;


document.addEventListener("DOMContentLoaded", function (e) { 

    var obj1 = perfil.getItem("perf");
    let objetoPerfil = JSON.parse(obj1);
    
document.getElementById("nom").value=objetoPerfil.name;
document.getElementById("ape").value=objetoPerfil.ape;
document.getElementById("ed").value=objetoPerfil.age;
document.getElementById("mail").value=objetoPerfil.email;
document.getElementById("tel").value=objetoPerfil.tel;


});
  

function updateInfo(){
    
    var obj1 = perfil.getItem("perf");
    let objetoPerfil = JSON.parse(obj1);
    objetoPerfil.name= document.getElementById("nom").value;
    objetoPerfil.ape= document.getElementById("ape").value;
    objetoPerfil.age= document.getElementById("ed").value;
    objetoPerfil.email= document.getElementById("mail").value;
    objetoPerfil.tel= document.getElementById("tel").value;
    var obj1=JSON.stringify(objetoPerfil);
    perfil.setItem("perf", JSON.stringify(objetoPerfil))
}


{
    var editable = document.getElementById("edit")
 
    editable.addEventListener("change", () => {
     if(editable.checked) {
         document.getElementById("nom").disabled = false;
         document.getElementById("ape").disabled = false;
         document.getElementById("ed").disabled = false;
         document.getElementById("mail").disabled = false;
         document.getElementById("tel").disabled = false;
 
     } 
     else{
         document.getElementById("nom").disabled = true;
         document.getElementById("ape").disabled = true;
         document.getElementById("ed").disabled = true;
         document.getElementById("mail").disabled = true;
         document.getElementById("tel").disabled = true;
     }
 });}


document.getElementById("guardarPerfil").addEventListener("click",updateInfo);



