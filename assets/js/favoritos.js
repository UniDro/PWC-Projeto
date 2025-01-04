//import { apiCall } from "./api";

import {apiCall} from "./api.js";



$(document).ready(function(){
    let paisId = new URLSearchParams(window.location.search).get('id');
    
        apiCall(`https://restcountries.com/v3.1/alpha/${paisId}`, detalhespais);
    apiCall("https://restcountries.com/v3.1/all?fields=name,cca3,flags,capital", displayPaises)
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
            

            let card = 
        `       
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
                                <button type="button" class="btn btn-primary btn-ver-mais" id="${id}">Ver mais</button>
                            </div>
                        </div>
                    </div>
                
        `;
        $(".pais-display").append(card).on("click", ".btn-ver-mais", function(){
            let id = $(this).closest(".card").find(".btn").attr("id");
            window.location.href = 'detalhespais.html?id='+id;
        });

        }
    })

    function isPaisFavorite(id){
        if(id == localStorage.getItem(id)){
          return true;
        }
        return false;
      }
}

function detalhespais(data) {
    let pais = data[0];

    let fotoPais = pais.flags['png'];
    let nomeCommon = pais.name['common'];
    let capital = pais.capital[0];
    let area = pais.area;
    let population = pais.population;
    let region = pais.region;
    let subregion = pais.subregion;
    let currency = pais.currencies[Object.keys(pais.currencies)[0]].name;
    let id = pais.cca3; 
    let favIcon = "assets/img/fav-empty.svg";
    let btn = "btn-icon-fav";

    if (isPaisFavorite(id)) {
        favIcon = "assets/img/fav-full.svg";
        btn = "btn-icon-defav";
    }

    let detalhes = `
        <div class="row">
            <div class="col-6">
                <img src="${fotoPais}" class="img-fluid" alt="Foto do Pais">
            </div>
            <div class="col-6">
                <h1>${nomeCommon}</h1>
                <p>Capital: ${capital}</p>
                <p>Área: ${area} km²</p>
                <p>População: ${population}</p>
                <p>Região: ${region}</p>
                <p>Sub-região: ${subregion}</p>
                <p>Moeda: ${currency}</p>

                <!-- Botão de favorito -->
                <button class="${btn}" id="${id}">
                    <img src="${favIcon}" class="img-fluid" alt="Ícone de favorito">
                </button>
            </div>
        </div>
    `;
    $(".detalhes-pais").html(detalhes);

    function isPaisFavorite(id) {
        return localStorage.getItem(id) !== null;
    }

    $(".detalhes-pais").on("click", ".btn-icon-fav", function() {
        let id = $(this).attr("id");
        localStorage.setItem(id, id);
        $(this).removeClass('btn-icon-fav').addClass('btn-icon-defav');
        $(this).find('img').attr("src", "assets/img/fav-full.svg");
    });

    $(".detalhes-pais").on("click", ".btn-icon-defav", function() {
        let id = $(this).attr("id");
        localStorage.removeItem(id);
        $(this).removeClass('btn-icon-defav').addClass('btn-icon-fav');
        $(this).find('img').attr("src", "assets/img/fav-empty.svg");
    });
}