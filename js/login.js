//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
miStorage = window.localStorage;

document.addEventListener("DOMContentLoaded", function(e){

    sessionStorage.removeItem("user")
    
    document.getElementById("idIngresar").addEventListener("click", formularioV); })
        
        function formularioV(ev) {

            ev.preventDefault();

    var Email = document.getElementById("emailInp");
    var Psw = document.getElementById("pswInp");
    

    if (Email.value=='' || Psw.value==''){
        alert("Los campos estan vacios")
    }
    else { 
        sessionStorage.setItem("user", Email.value)
        location.replace("index.html")

    }
    
}


