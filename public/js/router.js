'use strict'
import {renderContainer} from './render.js'
import {landingpage} from './routes.js'

function location(){
    renderContainer()
    landingpage()
}
window.addEventListener("hashchange", function(){
    if(window.location.hash === "#idSearch" || window.location.hash === "#random"){
        console.log("Landing page uitgevoerd+")
        return 
    }
    landingpage()
})
setInterval(()=>{
    // console.log(window.location.hash)
    if(window.location.hash === "#idSearch" || window.location.hash === "#random"){
        console.log("niet uitgevoerd")
    }else{
        console.log("Landing page uitgevoerd+") 
    }
},1000)
export {location}