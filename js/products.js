//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var listaArray = [];
document.addEventListener("DOMContentLoaded", function (e) {
getJSONData(PRODUCTS_URL).then(function(resultObj){
   
     listaArray = resultObj.data;
    showList(listaArray);
})
});


function showList(array){
    let listaAutos = "";
    
    for(let i = 0; i < array.length; i++){
        let mostrando = array[i]
        listaAutos += `
        <div>
            <img src="` + mostrando.imgSrc + `" alt="` + mostrando.description + `" class="img-thumbnail">
        </div>
        <div>
            <h4>`+ mostrando.name +`</h4> 
            <p> `+ mostrando.currency + mostrando.cost +`</p>
            <p> `+ mostrando.description +`</p>
            <p> `+ mostrando.soldCount + `<p>
            <br>
            </div>
        </div>
        `
        document.getElementById("listado").innerHTML = listaAutos; 
    }
}

