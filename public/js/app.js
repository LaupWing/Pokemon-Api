'use strict'
import {getData} from "./helper/fetchAPI.js"
// Export files zijn bij wijze van spreken gewoon IFFEs

// let url = 'https://pokeapi.co/api/v2/pokemon'

// console.log(getData())




getData()
// Destructering 
// import {loopingThroughArray ,addEvents, makeObject, checkPokemonElements, makeElements} from './utilities.js'

// getDataAsync()
// getData(url)



// async function getDataAsync(){
//     // Alles wat tussen de haakjes zit, word gewacht todat await klaar is
//     // Dan is het geen promise meer maar een resolve value

    
//     const urlAsync = (await fetch(url).then(urls=>urls.json())).results

//     const pokemonAsync = await Promise.all(urlAsync
//         .map(url=>url.url)
//         .map(url=>
//             fetch(url)
//             .then(data => data.json())))    

//     console.log(pokemonAsync) 

//     // const urls = (await fetch(url)
//     //     .then(response => response.json()))
//     //     .results
//     //     .map(result => result.url);
    
//     // // const pokemons = await Promise.all(urls
//     // //     .map(url => fetch(url).then(response => response.json())));

//     // const pokemons = await Promise.all(urls
//     //         .map(url => fetch(url)));
        
//     // const p = await Promise.all(pokemons
//     //     .map(response=> response.json()))
//     // // console.log(p)
// }

// document.querySelector(".submit").addEventListener("click", function(){
//     getData2("https://pokeapi.co/api/v2/pokemon/"+document.querySelector(".searching").value.toLowerCase())
//     console.log(document.querySelector(".searching").value.toLowerCase())
// })

// document.querySelector(".testing").addEventListener("click", function(){
//     console.log("test")
//     fetch("https://pokeapi.co/api/v2/evolution-chain/2/")
//         .then(data=>data)
//         .then(evolution=>evolution.json())
//         .then(evolution=>console.log(evolution))
// })

// document.querySelector(".searching").addEventListener("input", function(){
//     if(this.value === ""){
//         getData(url)
//     }
// })

// function getData(url){
//     fetch(url)
//     .then(data=>{
//         return data.json()
//     })
//     .then(res=>{
//         const pokemonUrlArray = []
//         res.results.forEach((x)=>{
//             pokemonUrlArray.push(x.url)
//         })
//         return pokemonUrlArray
//     })
//     .then(pokemons=>{
//         const requests = pokemons.map(pokemon=>{
//             return fetch(pokemon);
//         });

//         //> requests = [Promise<data>, Promise<data>, ...]
//         Promise.all(requests).then(fulfilledRequests => {
//             return fulfilledRequests.map(dataBlob => {
//                 return dataBlob.json();
//             });
//         }).then(jsons=>{
//             // console.log(jsons)
//             //> jsons = [Promise<{..}>, Promise<{..}>, ...]
//             Promise.all(jsons).then(jsonArray => {
//                 console.log(jsonArray)
//                 jsonArray.forEach((i)=>{
//                     array.push(makeObject(i))
//                 })
//                 checkPokemonElements()
//                 loopingThroughArray(array, makeElements)
//                 addEvents()
//             });
//         })
//     })         
// }

// function getData2(url){
//     fetch(url)
//         .then(data=>{
//             return data.json()
//         })
//         .then(pokemon=>{
//             array2 = []
//             array2.push(makeObject(pokemon))
//             console.log(array2)
//             checkPokemonElements()
//             loopingThroughArray(array2, makeElements)
//             addEvents()
//         })
// }



// routie('home', function() {
//     alert("alerting")
//     //this gets called when hash == #users
// });
// routie('detail', function() {   
// });