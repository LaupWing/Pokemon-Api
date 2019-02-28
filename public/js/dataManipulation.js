import {states} from "./app.js"
// const jwz = states.currentDataset
// console.log(states.currentDataset)
function sortByFirstLetter(){
    states.currentDataset.sort((a,b)=>{
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
    // console.log(states.currentDataset)
}
export {sortByFirstLetter}