
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
                    
                    
                    <td> <input id="cantidad`+i+`" class="col-5" type="number"  value="` + art[i].count + `"> </td>
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

function checkear(){
    cantid = document.getElementById("cantidad0")

if (cantid.value=='' || Psw.value==''){
    alert("Los campos estan vacios")
}
else { 
    sessionStorage.setItem("user", Email.value)
    location.replace("index.html")

}

}



//document.getElementById("cantidad0").addEventListener("click",checkear);




function sumar (){
     let envio = 0;
     let suma = 0;
     let suma2 = 0;
     let envioTotal = 0;

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
    else {
        envio=1;
    }


    
    for (i= 0; i < cantArt; i++){

      let cantidad = document.getElementById("cantidad"+i+"");
         let precio = document.getElementById("productprice"+i+"");

       document.getElementById("totalArt"+i+"").innerHTML=(parseFloat(precio.innerHTML)*parseFloat(cantidad.value));

    suma+= parseFloat(precio.innerHTML)*parseFloat(cantidad.value)*1.22

    suma2+= parseFloat(precio.innerHTML)*parseFloat(cantidad.value)*1.22

    }
    suma= suma*envio;

    envioTotal = suma2*(envio-1)
    
document.getElementById("subtotal").innerHTML=Math.round(suma);
document.getElementById("envioCosto").innerHTML=Math.round(envioTotal);
}
    

    
document.getElementById("general").addEventListener("click",sumar);

function verifyGeneral(){

    cant1 = document.getElementById("cantidad0");
    cant2 = document.getElementById("cantidad1");

    check1 = document.getElementById("premium")
    check2 = document.getElementById("express")
    check3 = document.getElementById("standard")

    var cheks = 0;

    if (check1.checked){
        cheks=1;
    }
    else if (check2.checked) {
        cheks=1;
    } else if (check3.checked){
        cheks=1;
    }
    

    if (cant1.value=='' || cant2.value=='' || cheks == 0){
        document.getElementById("spanErrorGeneral").style ='display:block; margin-top: 15px;';
        document.getElementById("bank").dataset.toggle = "";
    }
    else { 
        document.getElementById("spanErrorGeneral").style ='display:none';
        
        document.getElementById("bank").dataset.toggle = "modal";

    }

}

function cambio(moneda,costo){
 
    if ( moneda === "USD") {
        return costo * 40; 
    }
    return costo
}

function tranfbank(){ 
    
 
    
    document.getElementById("modal1").innerHTML = `

    <div class="padding">
<div class="row">
    <div class="col-sm-11">
        <div class="card">
            <div class="card-header">
                <strong>Transferencia bancaria</strong> <br>
                <small>Ingrese los detalles de su cuenta bancaria</small>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="name">Nombre</label>
                            <input class="form-control" id="name" type="text" placeholder="Ingrese su nombre"> </input>

                            <label for="name">Apellido</label>
                            <input class="form-control" id="ape" type="text" placeholder="Ingrese su apellido"> </input>

                            <label for="name">Calle</label>
                            <input class="form-control" id="calle" type="text" placeholder="Ingrese la calle de su domicilio"> </input>

                            <label for="name">Codigo postal</label>
                            <input class="form-control" id="cod" type="text" placeholder="Ingrese su codigo postal"> </input>

                            <label for="name">Pais</label>
                            <input class="form-control" id="pais" type="text" placeholder="Ingrese su pais de residencia"> </input>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="ccnumber">Nº de cuenta</label>
                            <div class="input-group">
                                <input class="form-control" type="text" placeholder="0000 0000 0000 0000" autocomplete="email"> </input>
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="mdi mdi-credit-card"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="alert-danger errorAlert" id="spanError" style="display: none;" >Error: Hay campos incompletos.</span>
            </div>
            <div class="card-footer">
                <button class="btn btn-sm btn-success float-right" onclick="verifyBank()" type="submit">
                    <i class="mdi mdi-gamepad-circle"></i> Pagar</button>
                <button class="btn btn-sm btn-danger" data-dismiss="modal" type="reset">
                    <i class="mdi mdi-lock-reset"></i> Cancelar</button>
            </div>
        </div>
    </div>
</div>
</div> `

}

function creditcard() {
    
    
        document.getElementById("modal1").innerHTML = `

        <div class="padding">
    <div class="row">
        <div class="col-sm-11">
            <div class="card">
                <div class="card-header">
                    <strong>Tarjeta de credito</strong> <br>
                    <small>Ingrese los detalles de su tarjeta</small>
                </div>
                <div id="cardBody" class="card-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="name">Nombre</label>
                                <input class="form-control" id="name" type="text" placeholder="Ingrese su nombre"> </input>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="ccnumber">Nº de tarjeta</label>
                                <div class="input-group">
                                    <input class="form-control" id="ncard" type="text" placeholder="0000 0000 0000 0000" autocomplete="email"> </input>
                                    <div class="input-group-append">
                                        <span class="input-group-text">
                                            <i class="mdi mdi-credit-card"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label for="ccmonth">Mes</label>
                            <select class="form-control" id="ccmonth">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                            </select>
                        </div>
                        <div class="form-group col-sm-4">
                            <label for="ccyear">Año</label>
                            <select class="form-control" id="ccyear">
                                <option>2014</option>
                                <option>2015</option>
                                <option>2016</option>
                                <option>2017</option>
                                <option>2018</option>
                                <option>2019</option>
                                <option>2020</option>
                                <option>2021</option>
                                <option>2022</option>
                                <option>2023</option>
                                <option>2024</option>
                                <option>2025</option>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="cvv">CVV/CVC</label>
                                <input class="form-control" id="cvv" type="text" placeholder="123"> </input>
                                
                            </div>
                        </div>
                    </div>
                    <span class="alert-danger errorAlert" id="spanError" style="display: none;" >Error: Hay campos incompletos.</span>
                </div>
                <div class="card-footer">
                    <button class="btn btn-sm btn-success float-right" onclick="verify()" type="submit">
                        <i class="mdi mdi-gamepad-circle"></i> Pagar</button>
                    <button class="btn btn-sm btn-danger" data-dismiss="modal" type="reset">
                        <i class="mdi mdi-lock-reset"></i> Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div> `

    }

    

    function modalbase(){
        document.getElementById("modal1").innerHTML = `
        <button id="credit" style="margin-top: 10px; margin-left: 15px;" onclick="creditcard()" type="button" class="btn btn-primary"  data-target="#exampleModal">
                      Tarjeta de credito
                    </button>
                    
                    <button id="bank" style="margin-top: 10px; margin-left: 15px;" onclick="tranfbank()" type="button" class="btn btn-primary"  data-target="#exampleModal">
                      Transferencia bancaria
                    </button> <br> `
    }

    function verify(){
        nom = document.getElementById("name");
        num = document.getElementById("ncard");
        mes = document.getElementById("ccmonth");
        año = document.getElementById("ccyear");
        cvc = document.getElementById("cvv");

        if (nom.value=='' || num.value=='' || mes.value=='' || año.value=='' || cvc.value==''){
            document.getElementById("spanError").style ='display:block';
        }
        else { 
            document.getElementById("spanError").style ='display:none';
            
            document.getElementById("modal1").innerHTML = `
            <span style="font-size: larger; border: lightgreen 10px;" class="row alert-success">¡Has comprado con éxito! </span>
            `
    
        }
    }

    function verifyBank(){
        nom = document.getElementById("name");
        ape = document.getElementById("ape");
        calle = document.getElementById("calle");
        cod = document.getElementById("cod");
        pais = document.getElementById("pais");

        if (nom.value=='' || ape.value=='' || calle.value=='' || cod.value=='' || pais.value==''){
            document.getElementById("spanError").style ='display:block'; 
        }
        else { 
            document.getElementById("spanError").style ='display:none';
            
            document.getElementById("modal1").innerHTML = `
            <span style="font-size: larger; border: lightgreen 10px;" class="row alert-success">¡Has comprado con éxito! </span>
            `
        }
        
    }

    
    