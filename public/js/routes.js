'use strict'
import {states} from "./app.js"
import{getData, getDataDetail} from "./api.js"
import {makeDetailElements, makeElements} from "./render.js"
import {toggleAddOnScroll} from "./events.js"
const consoleStyling = "color: black; background: yellow; padding: 5px"
// On reload (lading of the page) check what the route is (detail or overview)
function landingpage(){
    toggleAddOnScroll()
    const hashVal = window.location.hash.slice(1)

    if(window.location.hash === ""){
        console.log("%c Overview landingpage", `${consoleStyling}`)
        overviewLocalStorageCheck()
    }else if(isNumeric(hashVal)){
        console.log("%c Detail landingpage", `${consoleStyling}`)
        detailLocalStorageCheck()
    }else{
        console.log("%c Load to overviewpage", `${consoleStyling}`)
        window.location.hash = ""
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// Checking if the localstorage of the overview exist
function overviewLocalStorageCheck(){
    localStorageCheck(states.overview, overviewLocalstorage, overviewFetch)
}

// The Localstorage check function
function localStorageCheck(storage, callbackStorageExist,callbackDoesntStorageExist){
    if(storage){
        console.log("%c LocalStorage exist", `${consoleStyling}`)
        callbackStorageExist()
    }else{
        console.log("%c LocalStorage doesn't exist", `${consoleStyling}`)
        callbackDoesntStorageExist()
    }
}

// Fetching details of pokemon
function detailFetch(){
    console.log("%c Fetchig detail data", `${consoleStyling}`)
    let id = window.location.hash.substr(1)
    getDataDetail(id, true)
        .then(pokemon=>makeDetailElements(pokemon))
}

// Check in localstorag for the details array 
function detailLocalStorageCheck(){
    localStorageCheck(states.details, detailLocalstorage, detailFetch)
}

// Render detailpage from the localstorage 
function detailLocalstorage(){
    const array = states.details
    console.log("%c Checking if pokemon ID excist in the LocalStorage...", `${consoleStyling}`)
    const pokemonDetail = array.find(function(pokemon){
        return pokemon.id === Number(window.location.hash.substr(1))
    })
    // Checking for id in the detail localstorage
    if(pokemonDetail){
        console.log("%c Id is available", `${consoleStyling}`)
        makeDetailElements(pokemonDetail)
    }else{
        console.log("%c No id in the array", `${consoleStyling}`)
        detailFetch()
    }
    array.forEach(pokemon=>{
        pokemon.id === window.location.hash.substr(1)
    })
}

// Render overviewpage from the localstorage
function overviewLocalstorage(){
    console.log("%c Overview by localhost, LocalStorage exist", `${consoleStyling}`)
    const array = states.overview
    makeElements(array)
}

// 
async function overviewFetch(){
    console.log("%c Overview by fetching, LocalStorage doesn't exist", `${consoleStyling}`)
    const data = await getData()
    makeElements(data)
}

export {landingpage}