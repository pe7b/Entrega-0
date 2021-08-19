function verificarCampos() {
    alert(document.getElementById(inputEmail)) 
   }

   function cargarErrores(id, idMensaje) {
    var elementNombre = document.getElementById(id);
    var elementError = document.getElementById(idMensaje);
         if (elementNombre.value==''){ 
            elementError.style.display = "block"; 
            elementError.innerHTML ="Debe ingresar un " +id;
            elementNombre.classList.add("error"); } 

            else elementError.style.display = "none"
            elementNombre.classList.remove("error") ;
}
  }