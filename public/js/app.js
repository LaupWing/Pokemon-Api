'use strict'
import {location} from "./router.js"
import {getBgImage} from "./api.js"
const consoleStyling = "color:orange; background: grey; padding: 5px"

function init(){
    console.log("%c Initiliazing Website", `${consoleStyling}`)
    location()
}
const states = {
    overview: JSON.parse(localStorage.getItem("overview")),
    details: JSON.parse(localStorage.getItem("details")),
    currentDataset:[]
}
document.body.addEventListener("click",function(){
    console.log(states.currentDataset)
})
init()
// getBgImage()
export{states}