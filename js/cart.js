
let cantArt= 0;
document.addEventListener("DOMContentLoaded", () => {
    getJSONData(CART_INFO_URL_DESF).then( cartOBJ => {
        if (cartOBJ.status == "ok"){
            let priceproduct = cartOBJ.data;
            let art = priceproduct.articles 
            let cart = "";
            let cartCuentas= "";
            var subtot = 0;
           
            
            
            for (i= 0; i < art.length; i++){
                let costPesos = cambio(art[i].currency, art[i].unitCost);
                cantArt++;
                subtot += (costPesos*art[i].count);
                
                cart += `
                <table class="table table-striped table-dark tabla" >
            <tr>

                     <th>` + art[i].name +  `</th>
                    <td> <img src="${art[i].src}"  class="imagetable img-thumbnail col-3"> </td>
                    
                    
                    <td> <input id="cantidad`+i+`" class="col-5" type="number" value="` + art[i].count + `"> </td>
                    <td id="productprice`+i+`"> `+ costPesos + `</td>
                    <td id="totalArt`+i+`">` + (costPesos*art[i].count) + `</td>
                    <td>` + (costPesos*art[i].count)*0.22 +  `</td>
             </tr><br>
             
             </table>
                    `
            
                 }

                
                         
                
                document.getElementById("micarrito").innerHTML=cart;
                
                sumar();
        }
    })
})


function sumar (){
     let envio = 0;
     let suma = 0;

    check1 = document.getElementById("premium")
    check2 = document.getElementById("express")
    check3 = document.getElementById("standard")


    if (check1.checked){
        envio=1.15;
    }
    else if (check2.checked) {
        envio=1.07;
    } else if (check3.checked){
        envio=1.05;
    }


    
    for (i= 0; i < cantArt; i++){

      let cantidad = document.getElementById("cantidad"+i+"");
         let precio = document.getElementById("productprice"+i+"");

       document.getElementById("totalArt"+i+"").innerHTML=(parseFloat(precio.innerHTML)*parseFloat(cantidad.value));

    suma+= parseFloat(precio.innerHTML)*parseFloat(cantidad.value)*1.22

    

    }
    suma= suma*envio;
    
    document.getElementById("subtotal").innerHTML=Math.round(suma);
}
    

    
document.getElementById("general").addEventListener("click",sumar);



function cambio(moneda,costo){
 
    if ( moneda === "USD") {
        return costo * 40; 
    }
    return costo
}