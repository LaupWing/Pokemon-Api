import {makeObject} from "./customObject.js"
// import {addEvents, makeElements} from "../pageComponents/list.js"
import {renderList, removingElements} from "../states.js"

// Eerste intentie was om deze function de array terug te sturen zodat ik elements kon mkane met de opgehaalde data
// Maar helaas stuurt een fetch of promise altijd een promise terug dus dien je daarna alsnog deze promise te resolven
function getData(){
    let url = 'https://pokeapi.co/api/v2/pokemon';
    // Een then returned altijd een promise, omdat je .then kan chainen
    fetch(url)
        .then(fetchedData=>fetchedData.json())
        .then(data=>{
            // console.log(pokemon)
            return data.results.map((pokemon)=>{return pokemon.url})
        })
        .then(pokemonUrl=>{
            // Request zit vol met fetch promises deze kunnen allemaal geresolved worden door Promise.all
            const requests = pokemonUrl.map(pokemon=>{
                return fetch(pokemon);
            });

            // TIP net zo lang alles promisen totdat je normaal data terug heb. Denk ik...
            Promise.all(requests).then(fullfilledRequests=>{
                return fullfilledRequests.map(dataBlob =>{
                    return dataBlob.json()
                })
            }).then(jsons=>{
                Promise.all(jsons)
                    .then(data=>{
                        const array = data.map(pokemon=>makeObject(pokemon))
                        // array.forEach(item=>makeElements(item))
                        // array =[]
                        renderList(array)
                        // addEvents()
                    })
            })
        })
}

export {getData}

