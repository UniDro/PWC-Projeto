import {apiCall} from "./api.js";

$(document).ready(function(){
    apiCall("https://restcountries.com/v3.1/all?fields=name,flags", randomPaises)
})

function randomPaises(dataPaises)
{
    const arrlength = dataPaises.length;
    let elementosPaisesMostrar = new Set(); //Num set não pode haver números repetidos logo o while garante que nunca temos 3 paises repetidos.
    
    while(elementosPaisesMostrar.size < 3){
        console.log("Tou no loop infinito" + elementosPaisesMostrar)
        const elementoRandom = Math.floor(Math.random()*arrlength);
        elementosPaisesMostrar.add(elementoRandom);

    }

    const randomIndexes = Array.from(elementosPaisesMostrar);
    
    $.each(randomIndexes, function(index, randomIndexes){
        console.log(dataPaises[randomIndexes])
        let nomepais = dataPaises[randomIndexes].name['common']
        let imagem = dataPaises[randomIndexes].flags['png']
        let card = 
        `
            <div class="country-card">
                <img src="${imagem}" alt="Bandeira Pais aleatório">
                <h3>${nomepais}</h3>
            </div>
        `;
        $(".countries-container").append(card)
    })

    

}

/*<!-- Cartão 1 -->
          <div class="country-card">
            <img src="assets/img/eua.png" alt="Bandeira dos EUA">
            <h3>Estados Unidos da América</h3>
          </div>
    
          <!-- Cartão 2 -->
          <div class="country-card">
            <img src="assets/img/canada.png" alt="Bandeira do Canadá">
            <h3>Canadá</h3>
          </div>
    
          <!-- Cartão 3 -->
          <div class="country-card">
            <img src="assets/img/pt.jpg" alt="Bandeira do Reino Unido">
            <h3>Portugal</h3>
          </div>*/