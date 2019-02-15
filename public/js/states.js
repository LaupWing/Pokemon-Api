// import { makeElements } from "./utilities";
import {addEvents, makeElements} from "./pageComponents/list.js"

// ToDo List
// Importing the populating list module
// Creating Remove Pokemons Function 
// Render pokemon function
// Creating No Pokemons Found function
// Exporting removePokemons and RenderPokemons


function removingElements(){
    const pokemons = document.querySelectorAll(".pokemon");
    pokemons.forEach(pokemon => {
      pokemon.parentNode.removeChild(pokemon)
    });
}

// Error first programming 
// Check eerst wat je niet wil en gooi dan een error
// En dan de rest.
function renderList(pokemons){
    if(pokemons.length === 0) return noItemsFound()
    pokemons.forEach(pokemon => makeElements(pokemon))
    addEvents()
}

function noItemsFound(){
    const container = document.querySelector(".container")
    const newElement = `
        <div class="error flexCenter">
            <h1>No Pokemons Found</h1>
        </div>
        `
    container.insertAdjacentHTML( 'beforeend', newElement )
}

export{removingElements, renderList}