'use strict'
import {renderContainer, makeElements} from './render.js'
import {landingpage} from './routes.js'
import {states} from "./app.js"
import { filterData } from './dataManipulation.js';

function location(){
    renderContainer()
    landingpage()
}
window.addEventListener("hashchange", function(){
    if(window.location.hash === "#idSearch" || window.location.hash === "#random" || window.location.hash === "#sortById" || window.location.hash === "#sortByName" || window.location.hash === "#filterType"){
        switch(window.location.hash){
            case "#idSearch":
            makeElements(states.idSearch)
            break
            case "#random":
            makeElements(states.random)
            break
            case "#sortById":
            makeElements(states.sortById)
            break
            case "#sortByName":
            makeElements(states.sortByName)
            break
            case "#filterType":
            makeElements(states.filterType)
            break;
        }

        return 
    }
    landingpage()
})
// setInterval(()=>{
//     // console.log(window.location.hash)
//     if(window.location.hash === "#idSearch" || window.location.hash === "#random"){
//         console.log("niet uitgevoerd")
//     }else{
//         console.log("Landing page uitgevoerd+") 
//     }
// },1000)
export {location}