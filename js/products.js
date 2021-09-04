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


function showList(){

    let listaAutos = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let mostrando = currentCategoriesArray[i]
        
        if (((minCost == undefined) || (minCost != undefined && parseInt(mostrando.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(mostrando.cost) <= maxCost))){
                
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
            minCount = parseInt(minCost);
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

