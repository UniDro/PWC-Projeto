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
        //TODO: Em vez do console.log() dar append na row que tem os paises no home
    })

}