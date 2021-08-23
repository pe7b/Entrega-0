//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("idIngresar").addEventListener("click", function () {
    var Email = document.getElementById("emailInp");
    var Psw = document.getElementById("pswInp");

    if (Email.value=='' || Psw.value==''){
        alert("Los campos estan vacios")
    }
    else { 
        window.location = "index.html" }
    
    
})

})