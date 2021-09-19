//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
           let producto = resultObj.data;
            
            i=sessionStorage.getItem('pSelect');

            document.getElementById("titulo").innerHTML= producto.name;
            document.getElementById("descripcion").innerHTML = "Descripción: " + producto.description;
            document.getElementById("precio").innerHTML = "Precio: " + producto.cost;
            document.getElementById("moneda").innerHTML = "Moneda: " + producto.currency;
            document.getElementById("categoria").innerHTML = "Categoría: " + producto.category;
            document.getElementById("relevancia").innerHTML = "Relevancia: " + producto.soldCount;
            document.getElementById("prodRelacionados").innerHTML = "Productos relacionados: " + producto.relatedProducts;


            showImages(producto.images)

        }

    });
});

function showImages(array){
    let imagenesAMostrar = "";
    document.getElementById("productImg").innerHTML = imagenesAMostrar;
    for (let i = 0; i < array.length; i++) { 
        let imageSrc = array[i];
        
        if (i === 0) {
            imagenesAMostrar += `
            <div class="carousel-item active" data-interval="3700">
            <img class="d-block w-100" src="`+ imageSrc + `" alt="imagen">
            
            </div>
            `
        } else {
            imagenesAMostrar += `
            <div class="carousel-item" data-interval="3700">
            <img class="d-block w-100" src="`+ imageSrc + `" alt="imagen">
            
            </div>
            `
        }
        
        
            document.getElementById("productImg").innerHTML = imagenesAMostrar;
        }
    }


const PRODUCTOS_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";








function mostrarComentarios(array) {
    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let coment = array[i]
        let puntos = ""

        if (coment.score > 0 && coment.score <= 5) {
            for (let i = 1; i <= coment.score; i++) {
                puntos += '<span class="fa fa-star checked"></span>';

            }

            for (let i = coment.score + 1; i <= 5; i++) {
                puntos += '<span class="fa fa-star"></span>';
            }
        }
        
        contenido += `
        <div style="text-aling: right">` + puntos + `</div>
        <strong>Comentario: </strong>` + coment.description + `<br>
        <strong>Usuario: </strong>` + coment.user + `<br>
        <strong>Fecha: </strong>` + coment.dateTime + `<br>
        <br><br><hr>
        `
        document.getElementById("comentarios").innerHTML = contenido;
    }

    var hoy = new Date()
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();


    document.getElementById("newComent").addEventListener("click", function (e) {
        addComent();
    });


    function addComent(){

         let description = document.getElementById("comentTextArea").value;
         let puntos = document.getElementById("comentPuntos").value;
         let user = sessionStorage.getItem('user');
         var dateTime = fecha + " " + hora;
         let puntosR = "";
         var mostrarError = document.getElementById("error");

         
         if (description == ""|| puntos == null){
             mostrarError.innerHTML = "¡Debe ingresar un comentario!"
         } else{

            mostrarError.innerHTML = ""

         if (puntos > 0 && puntos <= 5) {
            for (let i = 1; i <= puntos; i++) {
                puntosR += '<span class="fa fa-star checked"></span>';

            }

            for (let i = puntos + 1; i <= 5; i++) {
                puntosR += '<span class="fa fa-star"></span>';
            }
        }

         contenido += `
        <div style="text-aling: right">` + puntosR + `</div>
        <strong>Comentario: </strong>` + description + `<br>
        <strong>Usuario: </strong>` + user + `<br>
        <strong>Fecha: </strong>` + dateTime + `<br>
        <br><br><hr>
        `
        document.getElementById("comentarios").innerHTML = contenido;
    }
    }
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTOS_INFO_COMMENTS_URL).then(function (response) {
        if (response.status === "ok") {
           let comentariosArray = response.data;

            mostrarComentarios(comentariosArray);
            
        }

    });
});
