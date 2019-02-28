'use strict'
import {container, makeDetailElements, makeElements} from "./render.js"
import {getData, randomPokemons, betweenNumberPokemons, getDataDetail} from "./api.js"
import {sortData, filterData} from "./dataManipulation.js"

const consoleStyling = "color:yellow; background:blue; padding:5px"
let searchAmount = 20
function addEvents(){
    console.log("%c Adding events", `${consoleStyling}`)
    container().querySelectorAll(".pokemon").forEach((i)=>{
        i.addEventListener("mouseover", function(){
            this.querySelector(".mainImage").classList.add("hoverAnimation")
        })
        i.addEventListener("mouseout", function(){
            this.querySelector(".mainImage").classList.remove("hoverAnimation")
        })
    })      
    container().querySelectorAll(".allImages img").forEach((i)=>{
        i.addEventListener("mouseover", function(){
            this.parentNode.parentNode.querySelector(".mainImage").src = this.src
        })
        i.addEventListener("mouseout", function(){
            // document.querySelector(".mainImage").src = this.src
        })
    })
}

const submitBtn =  document.querySelector(".submit")
submitBtn.addEventListener("click", async function(){
        const results = await getDataDetail(document.querySelector(".searching").value, true)
        makeDetailElements(results)
})


const randomizeBtn = document.querySelector(".random")
randomizeBtn.addEventListener("click", async function(){
        window.location.hash = "#random"
        randomPokemons()
})

const inputValue = document.querySelector(".submitRange")
inputValue.addEventListener("click", function(){
        window.location.hash = "#idSearch"
        toggleAddOnScroll()
        const minValue = Number(document.querySelector(".minNumber").value)
        const maxValue = Number(document.querySelector(".maxNumber").value)
        checkLimit(minValue, maxValue, betweenNumberPokemons)
})

const sortByLetter = document.querySelector(".name")
sortByLetter.addEventListener("change", sortByFirstLetter)
// Kan de functie hieronder niet in een aparte modules stoppen omdat die states niet kan zien en geen parameter kan doorgeven
function sortByFirstLetter(){
    window.location.hash = "#sortByName"
    if(sortByLetter.value === "AtoZ"){
        sortData("name",-1,1)
    }else{
        sortData("name",1,-1)
    }
}

// Attempt to make a settings object to make the function modulair and dynamic
// {
//     condition: sortByLetter.value === "AtoZ",
//     callbackIf: sortDataName(-1,1),
//     callbackElse: sortDataName(1,-1)
// }

const idNumber = document.querySelector(".idNumber")
idNumber.addEventListener("change",sortDataById)
function sortDataById(){
    window.location.hash = "#sortById"
    const value = idNumber.value
    if(value === "HigherFirst"){
        sortData("id",1,-1)
    }else{
        sortData("id",-1,1)
    }
}

const filterType = document.querySelector(".filterType")
filterType.addEventListener("change", filterByType)

function filterByType(){
    window.location.hash = "#filterType"
    const value = filterType.value
    filterData(value)
}


// Limit of the fetch request for the search between two id's 
function checkLimit(min, max, action){
    if(min <1 ){
        console.log("%c to low", `${consoleStyling}`)
        return
    }
    if(max >= 802 ){
        console.log("%c to high", `${consoleStyling}`)
        return
    }
    if(max - min > 100){
        console.log("%c maximum fetch is 100 pokemons", `${consoleStyling}`)
        return
    }
    if(max < min){
        console.log("%c Mininum is higher than maximum", `${consoleStyling}`)
        return
    }
    console.log(min, max)
    action(min,max)
}

// when scroll to bottom add 20 more pokemons
function addOnScroll(){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight-1) {
        searchAmount+=20
        getData(`https://pokeapi.co/api/v2/pokemon?limit=${searchAmount}`)
            .then(array=>makeElements(array))
    }
}

function toggleAddOnScroll(){
    if(window.location.hash===""){
        console.log("%c Scroll event active", `${consoleStyling}`)
        window.addEventListener("scroll", addOnScroll)
    }else{
        console.log("%c Scroll event inactive", `${consoleStyling}`)
        window.removeEventListener("scroll", addOnScroll)
    }
}

export {addEvents, toggleAddOnScroll}