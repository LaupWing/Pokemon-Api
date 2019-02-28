import {states} from "./app.js"
import {makeElements} from "./render.js"

function sortData(value, first,last){
    states.currentDataset.sort((a,b)=>{
        if(a[value] < b[value]) { return first; }
        if(a[value] > b[value]) { return last; }
        return 0;
    })
    storeData(value)
    makeElements(states.currentDataset)
}
function storeData(value){
    if(value === "name"){
        states.sortByName = states.currentDataset
    }else{
        states.sortById = states.currentDataset
    }
}

function filterData(value){
    const filtererd = states.currentDataset.filter(typeFilter)
    function typeFilter(obj){
        return obj.type[0] === value
    }
    states.filterType = filtererd
    states.currentDataset = filtererd
    makeElements(filtererd)
}
export {sortData, filterData}