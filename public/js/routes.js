'use strict'
import {states} from "./app.js"
import{getData, getDataDetail} from "./api.js"
import {makeDetailElements, makeElements} from "./render.js"

function overviewLocalStorageCheck(){
    localStorageCheck(states.overview, overviewLocalstorage, overviewFetch)
}

function localStorageCheck(storage, callbackStorageExist,callbackDoesntStorageExist){
    if(storage){
        console.log("LocalStorage exist")
        callbackStorageExist()
    }else{
        console.log("LocalStorage doesn't exist")
        callbackDoesntStorageExist()
    }
}
function detailFetch(){
    console.log("Fetchig detail data")
    let id = window.location.hash.substr(1)
    getDataDetail(id, true)
        .then(pokemon=>makeDetailElements(pokemon))
}

function landingpage(){
    if(window.location.hash === ""){
        console.log("Overview landingpage")
        overviewLocalStorageCheck()
    }else{
        console.log("Detail landingpage")
        detailLocalStorageCheck()
    }
}
function detailLocalStorageCheck(){
    localStorageCheck(states.details, detailLocalstorage, detailFetch)
}
function detailLocalstorage(){
    const array = states.details
    console.log("Checking if pokemon ID excist in the LocalStorage...")
    const pokemonDetail = array.find(function(pokemon){
        return pokemon.id === Number(window.location.hash.substr(1))
    })
    console.log(pokemonDetail)
    if(pokemonDetail){
        console.log("Id is available")
        makeDetailElements(pokemonDetail)
    }else{
        console.log("No id in the array")
        detailFetch()
    }
    array.forEach(pokemon=>{
        pokemon.id === window.location.hash.substr(1)
    })
}

function overviewLocalstorage(){
    console.log("Overview by localhost, LocalStorage exist")
    const array = states.overview
    makeElements(array)
}

async function overviewFetch(){
    console.log("Overview by fetching, LocalStorage doesn't exist")
    const data = await getData()
    .makeElements(data)
}

export {landingpage}