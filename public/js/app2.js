(function(){
    const router ={
        overview: async function(){
                const data = await api.getData()
                render.renderContainer()
                console.log(data)
                data.forEach(item=>render.makeElements(item))
                events.addEvents()
        },
        urlChange: window.addEventListener("hashchange", function(){
            let id = window.location.hash.substr(1)
            render.removingElements()
            if(id===""){
                this.overview()
            }else{
                api.getDataDetail(`https://pokeapi.co/api/v2/pokemon/${id}`)
                    .then(pokemon=>render.makeDetailElements(pokemon))
            }
        })
    }
    
    const api={
        overviewUrl: "https://pokeapi.co/api/v2/pokemon",
        getData: function(url = this.overviewUrl){
            return fetch(url)
                .then(data => data.json())
                .then(jsonData => jsonData.results)
                .then(results => results.map(pokemon=>pokemon.url))
                .then(urls => {
                    const pokemons = urls.map(pokemonUrl=>{
                        return fetch(pokemonUrl)
                            .then(pokemons => pokemons)
                    })
                    return Promise.all(pokemons);
                })
                .then(responses=> {
                    const jsons = responses.map(res=>res.json())
                    return Promise.all(jsons)
                })
                .then(pokemons => pokemons.map(pokemon => this.parseData(pokemon)))
                 
        },
        getDataDetail: function(url){
            return fetch (url)
                .then(data=> data.json())
                .then(jsonData => jsonData)
        },
        getBgImage: function(){
            console.log("check")
            fetch("https://source.unsplash.com/1600x900?nature,dark")
                .then(response=>{
                    document.body.style.background =`url(${response.url})`
                })
        },
        parseData:function(item){
            return {
                name: this.capatalize(item.name),
                id: item.id,
                defaultBack: item.sprites.back_default,
                defaultFront: item.sprites.front_default,
                shinyFront: item.sprites.front_shiny,
                shinyBack: item.sprites.back_shiny,
                type: item.types.map(type=>type.type.name)
            }
        },
        capatalize: function(word){
                return word[0].toUpperCase()+word.slice(1)      
        }

    }
    const render={
        renderContainer: function(){
            const app = document.querySelector('#root');
            const container = document.createElement('div');
            container.classList.add("container");
            app.appendChild(container);
        },
        container:function(){return document.querySelector(".container")},
        removingElements:function(){
            const a = document.querySelectorAll("a");
            a.forEach(pokemon => pokemon.parentNode.removeChild(pokemon));
        },
        makeElements: function(pokemon){
            const newElement = `
                <a href="#${pokemon.id}">
                    <div class="pokemon flexCenter">
                        <h2>${pokemon.name}</h2>
                        <img class="mainImage" src="${pokemon.defaultFront}"></img>
                        <div class="allImages">
                            <img src="${pokemon.defaultFront}">
                            <img src="${pokemon.defaultBack}">
                            <img src="${pokemon.shinyFront}">
                            <img src="${pokemon.shinyBack}">
                        </div>
                    </div>
                </a>
                `
            this.container().insertAdjacentHTML( 'beforeend', newElement )
        },
        makeDetailElements:function(pokemon){
            console.log(pokemon)
            const newElement = `
                <div class="detailsContainer flexCenter">
                    <h2 class="detailTitle">${api.capatalize(pokemon.name)}</h2>
                    <img class="detail_mainImage" src="${pokemon.sprites.front_default}"></img>
                </div>
                `
            console.log("adding elements")
            this.container().insertAdjacentHTML( 'beforeend', newElement )
        },
    }
    const events = {
        addEvents: function(){
            render.container().querySelectorAll(".pokemon").forEach((i)=>{
                i.addEventListener("mouseover", function(event){
                    this.querySelector(".mainImage").classList.add("hoverAnimation")
                })
                i.addEventListener("mouseout", function(event){
                    this.querySelector(".mainImage").classList.remove("hoverAnimation")
                })
            })      
            render.container().querySelectorAll(".allImages img").forEach((i)=>{
                i.addEventListener("mouseover", function(){
                    this.parentNode.parentNode.querySelector(".mainImage").src = this.src
                })
                i.addEventListener("mouseout", function(){
                    // document.querySelector(".mainImage").src = this.src
                })
            })
        },
        searching: document.querySelector(".searching").addEventListener("input",function(){
            console.log("checking")
        })
     }
    router.overview()
    api.getBgImage()
}())