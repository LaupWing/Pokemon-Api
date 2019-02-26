'use strict'
import {container, makeDetailElements} from "./render.js"
import {randomPokemons, betweenNumberPokemons, getDataDetail} from "./api.js"

function addEvents(){
    console.log("Adding events")
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
        randomPokemons()
})

const inputValue = document.querySelector(".submitRange")
inputValue.addEventListener("click", function(){
        const minValue = Number(document.querySelector(".minNumber").value)
        const maxValue = Number(document.querySelector(".maxNumber").value)
        checkLimit(minValue, maxValue, betweenNumberPokemons)
})

function checkLimit(min, max, action){
    if(min <1 ){
        console.log("to low")
        return
    }
    if(max >= 802 ){
        console.log("to high")
        return
    }
    if(max - min > 100){
        console.log("maximum fetch is 100 pokemons")
        return
    }
    if(max < min){
        console.log("Mininum is higher than maximum")
        return
    }
    action(min,max)
}

export {addEvents}