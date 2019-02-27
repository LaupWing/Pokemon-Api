'use strict'
import {states} from "./app.js"
import {capatalize} from "./api.js"
import {addEvents} from "./events.js"
const consoleStyling = "color:black; background:orange; padding:5px"
function renderContainer(){
    console.log("%c Rendering container", `${consoleStyling}`)
    const app = document.querySelector('#root');
    const container = document.createElement('div');
    container.classList.add("container");
    app.appendChild(container);
}

function container(){
    return document.querySelector(".container")
}

function toggleLoader(){
    document.querySelector(".loader").classList.toggle("visibility")
}

function removingElements(){
    const container = document.querySelector(".container")
    // Hieronder is veel betere manier om child elementen van de container te verwijderen
    // De manier onder de while loop is alleen specifiek gericht op de a elemententjes
    // Door de container te pakken en tekijken of er een child in zit is dit veel modulairder
    // Want nu maakt het niet uit wat voor element in de container zit.
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
    // const a = document.querySelectorAll("a");
    // a.forEach(pokemon => pokemon.parentNode.removeChild(pokemon));
}

function makeElements(array){
    removingElements()
    states.currentDataset = array
    array.forEach(pokemon=>{
        const newElement = `
            <a href="#${pokemon.id}">
                <div class="pokemon flexCenter">
                    <h2>${pokemon.name}</h2>
                    <img class="mainImage" src="${pokemon.defaultFront}"></img>
                    <div class="allImages">
                        <img src="${pokemon.defaultFront}">
                        <img src="${pokemon.defaultBack}">
                        <img src="${pokemon.shinyFront}">
                        <img src="${pokemon.shinyBack}">
                    </div>
                </div>
            </a>
            `
        container().insertAdjacentHTML( 'beforeend', newElement )
    })
    addEvents()
}


function makeDetailElements(pokemon){
    removingElements()
    const newElement = `
        <div class="detailsContainer flexCenter">
            <h2 class="detailTitle">${capatalize(pokemon.name)}</h2>
            <img class="detail_mainImage" src="${pokemon.sprites.front_default}"></img>
        </div>
        `
    container().insertAdjacentHTML( 'beforeend', newElement )
}

function noPokemonsFound(value){
    removingElements()
    const newElement = `
        <div class="error flexCenter">
            <h2 class="error-title">Nothing found with the search term "${value}"</h2>
        </div>
        `
    container().insertAdjacentHTML( 'beforeend', newElement )
}


export {noPokemonsFound, makeDetailElements, makeElements, renderContainer, container, toggleLoader}