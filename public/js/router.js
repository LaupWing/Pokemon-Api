'use strict'
import {renderContainer} from './render.js'
import {landingpage} from './routes.js'

function location(){
    renderContainer()
    landingpage()
}
window.addEventListener("hashchange", landingpage)

export {location}