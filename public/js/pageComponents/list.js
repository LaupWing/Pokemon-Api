// Render the whole list of pokemons

// Make container to to populate the list of pokemons
const app = document.querySelector('#root');
const container = document.createElement('div');
container.classList.add("container");
app.appendChild(container);

function makeElements(a){
    const container = document.querySelector(".container")
    const newElement = `
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

function addEvents(){
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

export {addEvents, makeElements}