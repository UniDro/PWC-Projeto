//import { apiCall } from "./api";

import {apiCall} from "./api.js";

$(document).ready(function(){
    apiCall("https://restcountries.com/v3.1/all?fields=name,cca3,flags,capital", displayPaises, 5)
})



function displayPaises(dataPaises){
    $.each(dataPaises, function(index,dataPais){
        
        console.log(dataPais.flags['png']);
        let fotoPais = dataPais.flags['svg'];
        

        let card = 
        `        <div class = "col-md-3">
                    <div class="card">
                        <img class="card-img-top" src="${fotoPais}" alt="Foto do Pais">
                        <div class="card-body">
                            <div class="row">  
                                <div class="col-9">
                                    <h5 class="card-title">Titulo card</h5>
                                </div>
                                <div class="col-3">
                                    <button class="btn btn-primary" id="xopa">
                                      mete imagem aqui
                                    </button>
                                </div>
                            </div>
                            <p class="card-text">Alguma informação relativa a este pequeno patudo, lindo e fofo!</p>
                            <div class="text-center">
                                <button type="button" class="btn btn-primary btn-ver-mais" id="xopa">Ver mais</button>
                            </div>
                        </div>
                    </div>
                 </div>   
        `;

        $(".pais-display").append(card);
        
    })
}