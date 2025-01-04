//import { apiCall } from "./api";

import {apiCall} from "./api.js";



$(document).ready(function(){
    apiCall("https://restcountries.com/v3.1/all?fields=name,cca3,flags,capital", displayPaises, 5)
})

$(".custom-search-bar").on("click", "#searchBtn", function(){
    const searchVal = $("#searchBar").val();
    const url = "https://restcountries.com/v3.1/name/"+searchVal+"?fields=name,cca3,flags,capital"
    console.log(url);
    apiCall(url, displayPaises);
})

$(".pais-display").on("click", ".btn-icon-fav", function(){
    let id = $(this).attr("id");
    localStorage.setItem(id, id)
    $(this).removeClass('btn-icon-fav').addClass('btn-icon-defav');
    $(this).find('img').remove()
    $(this).append('<img src="assets/img/fav-full.svg" alt="icon favorito" class="img-fluid"></img>');
  });

$(".pais-display").on("click", ".btn-icon-defav", function(){
    console.log("botão defav clicado");
    let id = $(this).attr("id");
    
    localStorage.removeItem(id, id)
    $(this).removeClass('btn-icon-defav').addClass('btn-icon-fav');
    $(this).find('img').remove()
    $(this).append('<img src="assets/img/fav-empty.svg" alt="icon favorito" class="img-fluid"></img>');
  });

function displayPaises(dataPaises){
    $.each(dataPaises, function(index,dataPais){
        
        console.log(dataPais.flags['png']);
        let fotoPais = dataPais.flags['png'];
        let id = dataPais.cca3;
        let favIcon = "assets/img/fav-empty.svg";
        let btn = "btn-icon-fav";


        if (isPaisFavorite(id)){
            favIcon = "assets/img/fav-full.svg";
            btn = "btn-icon-defav"
        }

        let card = 
        `        <div class = "col-md-3">
                    <div class="card">
                        <img class="card-img-top custom-img" src="${fotoPais}" alt="Foto do Pais">
                        <div class="card-body">
                            <div class="row">  
                                <div class="col-9">
                                    <h5 class="card-title">Titulo card</h5>
                                </div>
                                <div class="col-3">
                                    <button class="${btn}" id="${id}">
                                        <img src="${favIcon}" class="img-fluid"></img>
                                    </button>
                                </div>
                            </div>
                            <p class="card-text">Capital: Capital X</p>
                            <div class="text-center">
                                <button type="button" class="btn btn-primary btn-ver-mais" id="xopa">Ver mais</button>
                            </div>
                        </div>
                    </div>
                 </div>   
        `;

        $(".pais-display").append(card);
        
    })

    function isPaisFavorite(id){
        if(id == localStorage.getItem(id)){
          return true;
        }
        return false;
      }
}