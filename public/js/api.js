'use strict'
import {makeElements, toggleLoader} from "./render.js"
import {states} from "./app.js"
const overviewUrl =  "https://pokeapi.co/api/v2/pokemon"
const consoleStyling = "color:lime; background:black; padding: 5px"

function getData(url = overviewUrl){
    console.log(url)
    toggleLoader()
    return fetch(url)
        .then(data => data.json())
        .then(jsonData => jsonData.results)
        .then(results => results.map(pokemon=>pokemon.url))
        .then(urls => {
            const pokemons = urls.map(pokemonUrl=>{
                return fetch(pokemonUrl)
                    .then(pokemons => pokemons)
            })
            return Promise.all(pokemons);
        })
        .then(responses=> {
            const jsons = responses.map(res=>res.json())
            return Promise.all(jsons)
        })
        .then(pokemons => {
            const pokemonArray = pokemons.map(pokemon => parseData(pokemon))
            console.log(pokemonArray.length)
            if(pokemonArray.length <=100){
                console.log(pokemonArray)
                localStorage.setItem("overview", JSON.stringify(pokemonArray)) 
            }
            toggleLoader()
            return pokemonArray
        })        
}

function getDataDetail(pokemon, storage){
    console.log(pokemon, storage)
    return fetch (`${overviewUrl}/${pokemon}`)
        .then((response)=>{ 
            if(response.status === 404){
                noPokemonsFound(pokemon)
            }
            return response.json()
        })
        .then(jsonData => {
            console.log("%c Saving it in localstorage= "+ storage, `${consoleStyling}`)
            if(storage){
                const array = (states.details) ? states.details : [];
                array.push(jsonData)  
                localStorage.setItem("details", JSON.stringify(array))
            }
            return jsonData
        })
}

function getBgImage(){
    fetch("https://source.unsplash.com/1600x900?nature")
        .then(response=>{
            document.body.style.background =`url(${response.url})`
        })
}

function parseData(item){
    return {
        name: capatalize(item.name),
        id: item.id,
        defaultBack: checkImageAvailability(item.sprites.back_default),
        defaultFront: checkImageAvailability(item.sprites.front_default),
        shinyFront: checkImageAvailability(item.sprites.front_shiny),
        shinyBack: checkImageAvailability(item.sprites.back_shiny),
        type: item.types.map(type=>type.type.name),
        weight: item.weight,
        stats: item.stats.map(stat=>{
            return {
                statName: stat.stat.name,
                baseStat: stat.base_stat  
            }})
    }
}

function checkImageAvailability(image){
    if(image){
        return image
    }
    return ""
}

function capatalize(word){
    return word[0].toUpperCase()+word.slice(1)   
}

function randomPokemons(){
    toggleLoader()
    console.log("Random pokemons are generating")
    const randomNumbers =[]
    for (let index = 0; index < 20; index++) {
        const random = Math.floor(Math.random()*802)+1
        randomNumbers.push(random)
    }
    const results = randomNumbers.map(random=>getDataDetail(random, false))     
    Promise.all(results)
        .then(pokemon=>{
            toggleLoader()
            const randomPokemonArray = pokemon.map(pokemon=>parseData(pokemon))
            states.random = randomPokemonArray
            makeElements(randomPokemonArray)
        })
}

function betweenNumberPokemons(min, max){
    toggleLoader()
    const promiseArray = []
    for (let index = min; index <= max; index++) {
        promiseArray.push(getDataDetail(index, false))
    }
    
    Promise.all(promiseArray)
        .then(pokemons=>{
            const array = pokemons.map(pokemon=>parseData(pokemon))
            toggleLoader()
            states.idSearch = array
            makeElements(array)
        })
}

export{betweenNumberPokemons,randomPokemons,getBgImage,getDataDetail, getData, capatalize}