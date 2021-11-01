//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var listaArray = [];
const ORDER_ASC_BY_PRICE = "ASC";
const ORDER_DESC_BY_PRICE = "DESC";
const ORDER_DESC_BY_SOLDCOUNT = "SOLDCOUNT";

var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;



function sortCategories(criterio, array) {
    let arraySorted = [];

    if (criterio === ORDER_ASC_BY_PRICE)  {
        arraySorted = array.sort(function (a,b) {
            if (a.cost < b.cost ){return -1;}
            if (a.cost > b.cost ){return 1;}
            return 0;
        });
    }

    if (criterio === ORDER_DESC_BY_PRICE) {
        arraySorted = array.sort(function (a,b) {
            if (a.cost > b.cost ){return -1;}
            if (a.cost < b.cost ){return 1;}
            return 0;
        });
    }

    if (criterio === ORDER_DESC_BY_SOLDCOUNT) {
        arraySorted = array.sort(function (a,b) {
            if (a.soldCount > b.soldCount ){return -1;}
            if (a.soldCount < b.soldCount ){return 1;}
            return 0;
        });
    }
    return arraySorted;
}

function showID(clicked_id)
{
    sessionStorage.setItem("pSelect", clicked_id)
}

function showList(){

    let pSelect = 0;
    let listaAutos = "";
    document.getElementById("listado").innerHTML = listaAutos; 
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let mostrando = currentCategoriesArray[i]
        pSelect++;
        

        if (((minCost == undefined) || (minCost != undefined && parseInt(mostrando.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(mostrando.cost) <= maxCost))){
                

             
            



            listaAutos += `
            <div style="margin-top: 5px;"  class="col-md-4">
        <div id="`+pSelect+`"  class=" card shadow-sm custom-card" onclick="showID(this.id); window.location ='product-info.html';">
            <div class="col-14" id="productSelect" onclick="window.location ='product-info.html'; showID(this.id) ">
            <img src="` + mostrando.imgSrc + `" alt="` + mostrando.description + `" class="bd-placeholder-img card-img-top">
            </div>
        
        <div class="col">
        <div class="d-flex w-100 justify-content-between" onclick="">
                
           <div style="margin-top: 5px;" class="col-md-11"> <h4>`+ mostrando.name +`</h4>     
            <p class="text-muted"> `+ mostrando.currency + mostrando.cost +`</p> 
            <p style="height: 70px;"> `+ mostrando.description +`</p> 
            <p class="text-muted">Cantidad disponible: `+ mostrando.soldCount + `<p></div>
            <br>
            </div>
            </div>
            
            </div>
        </div>
        </div>
        
        `

        
        
        document.getElementById("listado").innerHTML = listaAutos; 
        
        }
    }
    
}



function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    
    showList();
}






//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        
   
            listaArray = resultObj.data;
           showList(listaArray);

        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_SOLDCOUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }
        
        
        showList();
        

    });
});


    

