'use strict'
import {renderContainer} from './render.js'
import {landingpage} from './routes.js'

function location(){
    renderContainer()
    landingpage()
}
window.addEventListener("hashchange", function(){
    if(window.location.hash !== "#idSearch"){
        console.log("Landing page uitgevoerd+") 
        landingpage()
    }
})
export {location}