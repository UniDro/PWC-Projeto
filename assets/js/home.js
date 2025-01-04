import { apiCall } from "./api.js";

$(document).ready(function() {
    let paisId = new URLSearchParams(window.location.search).get('id');

    apiCall(`https://restcountries.com/v3.1/alpha/${paisId}`, detalhespais);
    
   
    apiCall("https://restcountries.com/v3.1/all?fields=name,flags,cca3", randomPaises);
    
});

function randomPaises(dataPaises) {
    const arrlength = dataPaises.length;
    let elementosPaisesMostrar = new Set(); // Num set não pode haver números repetidos, logo o while garante que nunca temos 3 paises repetidos.

    while (elementosPaisesMostrar.size < 3) {
        const elementoRandom = Math.floor(Math.random() * arrlength);
        elementosPaisesMostrar.add(elementoRandom);
    }

    const randomIndexes = Array.from(elementosPaisesMostrar);

    $.each(randomIndexes, function(index, randomIndex) {
        let nomePais = dataPaises[randomIndex].name['common'];
        let imagem = dataPaises[randomIndex].flags['png'];
        let id = dataPaises[randomIndex].cca3;

        let card = `
            <div class="country-card" data-id="${id}">
                <img src="${imagem}" alt="Bandeira do País aleatório">
                <h3>${nomePais}</h3>
            </div>
        `;
        
        $(".countries-container").append(card);
    });

    $(".countries-container").on("click", ".country-card", function() {
        let id = $(this).data("id");
        window.location.href = 'detalhespais.html?id=' + id;
    });
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
