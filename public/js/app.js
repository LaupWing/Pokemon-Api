'use strict'
import {location} from "./router.js"
import{getBgImage} from "./api.js"
function init(){
    location()
}
const states = {
    overview: JSON.parse(localStorage.getItem("overview")),
    details: JSON.parse(localStorage.getItem("details")),
    currentDataset:[]
}

init()
getBgImage()
export{states}