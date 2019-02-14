const app = document.querySelector('#root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

export function makeObject(item){
    return {
        name: capatalize(item.name),
        id: item.id,
        defaultBack: item.sprites.back_default,
        defaultFront: item.sprites.front_default,
        shinyFront: item.sprites.front_shiny,
        shinyBack: item.sprites.back_shiny,
        type: item.types.map(type=>type.type.name)
    }
}

function capatalize(word){
    return word[0].toUpperCase()+word.slice(1)
}

export function makeElements(a){
    var newElement = `
        <div class="pokemon ${a.id} flexCenter">
            <h2>${a.name}</h2>
            <img class="mainImage" src="${a.defaultFront}"></img>
            <div class="allImages">
                <img src="${a.defaultFront}">
                <img src="${a.defaultBack}">
                <img src="${a.shinyFront}">
                <img src="${a.shinyBack}">
            </div>
        </div>
        `
    container.insertAdjacentHTML( 'beforeend', newElement )
}

export function addEvents(){
    container.querySelectorAll(".pokemon").forEach((i)=>{
        i.addEventListener("mouseover", function(event){
            this.querySelector(".mainImage").classList.add("hoverAnimation")
        })
        i.addEventListener("mouseout", function(event){
            this.querySelector(".mainImage").classList.remove("hoverAnimation")
        })
    })
    
    container.querySelectorAll(".allImages img").forEach((i)=>{
        i.addEventListener("mouseover", function(){
            this.parentNode.parentNode.querySelector(".mainImage").src = this.src
        })
        i.addEventListener("mouseout", function(){
            // document.querySelector(".mainImage").src = this.src
        })
    })
}

export function loopingThroughArray(array, startFunction){
    array.forEach((a)=>{
        startFunction(a)
        // makeElements(a)
    })
}

function removeElements() {
    console.log("removing")
    let pokemons = document.querySelectorAll(".pokemon");
    pokemons.forEach(pokemon => {
      pokemon.parentNode.removeChild(pokemon);
    });
}

export function checkPokemonElements(){
    if(document.querySelector(".pokemon")){
        removeElements()
    }
}
// window.onscroll = function(ev) {
//     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//         alert("you're at the bottom of the page");
//     }
// };