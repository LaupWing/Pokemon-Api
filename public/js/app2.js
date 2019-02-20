(function(){
    const router ={
        overview: async function(){
                const data = await api.getData()
                render.renderContainer()
                render.removingElements()
                data.forEach(item=>render.makeElements(item))
                events.addEvents()
        },
        urlChange: window.addEventListener("hashchange", function(){
            let id = window.location.hash.substr(1)
            if(id===""){
                router.overview()
            }else{
                api.getDataDetail(id)
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
        getDataDetail: function(pokemon){
            return fetch (`${this.overviewUrl}/${pokemon}`)
                .then((response)=>{ 
                    if(response.status === 404){
                        render.noPokemonsFound(pokemon)
                    }
                    return response.json()
                })
                .then(jsonData => jsonData)
        },
        getBgImage: function(){
            fetch("https://source.unsplash.com/1600x900?nature")
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
        },
        randomPokemons: function(){
            const randomNumbers =[]
            for (let index = 0; index < 20; index++) {
                const random = Math.floor(Math.random()*802)+1
                randomNumbers.push(random)
            }
            const results = randomNumbers.map(random=>this.getDataDetail(random))
            Promise.all(results)
                .then(pokemon=>{
                    render.removingElements()
                    const randomPokemonArray = pokemon.map(pokemon=>this.parseData(pokemon))
                    randomPokemonArray.forEach(pokemon=>render.makeElements(pokemon))
                    events.addEvents()
                })
        },
        betweenNumberPokemons:function(min, max){
            console.log(min,max, "uitgevoerd")
            // for (let index = min; index < max; index++) {
            //     console.log(index)
            //     // fetch(index)
            //     //     .then(data=>data.json)
            //     //     .then(json=>console.log(json))
            // }
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
            const container = document.querySelector(".container")
            // Hieronder is veel betere manier om child elementen van de container te verwijderen
            // De manier onder de while loop is alleen specifiek gericht op de a elemententjes
            // Door de container te pakken en tekijken of er een child in zit is dit veel modulairder
            // Want nu maakt het niet uit wat voor element in de container zit.
            while(container.firstChild){
                container.removeChild(container.firstChild)
            }
            // const a = document.querySelectorAll("a");
            // a.forEach(pokemon => pokemon.parentNode.removeChild(pokemon));
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
            render.removingElements()
            const newElement = `
                <div class="detailsContainer flexCenter">
                    <h2 class="detailTitle">${api.capatalize(pokemon.name)}</h2>
                    <img class="detail_mainImage" src="${pokemon.sprites.front_default}"></img>
                </div>
                `
            this.container().insertAdjacentHTML( 'beforeend', newElement )
        },
        noPokemonsFound: function(value){
            render.removingElements()
            const newElement = `
                <div class="error flexCenter">
                    <h2 class="error-title">Nothing found with the search term "${value}"</h2>
                </div>
                `
            this.container().insertAdjacentHTML( 'beforeend', newElement )
        }   
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
        submitBtn: document.querySelector(".submit").addEventListener("click", async function(){
            const results = await api.getDataDetail(document.querySelector(".searching").value)
            render.makeDetailElements(results)
        }),
        randomizeBtn: document.querySelector(".random").addEventListener("click", async function(){
            api.randomPokemons()
        }),
        inputValue:document.querySelector(".submitRange").addEventListener("click",function(){
            // Moest echt aangeven dat het nummer was anders deed die raar.
            const minValue = Number(document.querySelector(".minNumber").value)
            const maxValue = Number(document.querySelector(".maxNumber").value)
            events.checkLimit(minValue, maxValue, api.betweenNumberPokemons)
        }),
        checkLimit: function(min, max, action){
            if(min <1 ){
                console.log("to low")
                return
            }
            if(max >= 802 ){
                console.log("to high")
                return
            }
            if(max - min > 100){
                console.log("maximum fetch is 100 pokemons")
                return
            }
            if(max < min){
                console.log("Mininum is higher than maximum")
                return
            }
            action(min,max)
        }
     }
    router.overview()
    api.getBgImage()
}())