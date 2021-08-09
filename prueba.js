
 function nuevoEl() {

    var para = document.createElement("P");

     para.innerHTML = "This is a paragraph.";

     document.getElementById("contenido").appendChild(para);

 }

 


 function escribirElemento(valor) {

    
  document.getElementById("demo").innerHTML = valor;

 }

 function escribirCien() {
    let txt = "";
    
    for (let i = 0; i <= 100; i++) {
         txt +=" " +i;
      escribirElemento(txt);
      
    }
     }

 function agregarEstilos(valor) {

     var element = document.getElementById("contenido");

     element.classList.add(valor);

 }

 



