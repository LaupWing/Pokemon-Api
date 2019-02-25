(function(){
    const routes ={
        overview: async function(){
                const data = await api.getData()
                render.renderContainer()
                render.removingElements()
                data.forEach(item=>render.makeElements(item))
                events.addEvents()
        },
        detail: function(){
            let id = window.location.hash.substr(1)
            if(id===""){
                routes.overview()
            }else{
                api.getDataDetail(id)
                    .then(pokemon=>render.makeDetailElements(pokemon))
            }
        }
    }

    const app = { 
        init: function(){
            router.location()
        },
        states:{
            overview: JSON.parse(localStorage.getItem("overview")),
            details: JSON.parse(localStorage.getItem("details")),
            currentDataset:[]
        }
    }

    const router = { 
        location: function(){
            if(window.location.hash === ""){
                console.log("Overviewpagina")
                if(app.states.overview){
                    console.log("LocalStorage aanwezig")
                    render.renderContainer()
                    app.states.overview.forEach((pokemon)=>render.makeElements(pokemon))
                }else{
                    console.log("LocalStorage niet aanwezig")
                    routes.overview()
                }
            }else{
                if(app.states.details){
                    console.log("Detail aanwezig in LocalStorage")
                    
                }
                console.log(app.states.details)
                // cons
                // console.log("Detailpagina")
                // if(overview){
                    render.renderContainer()
                    routes.detail()
                // }else{

                // }
            }
        },
        urlChange: window.addEventListener("hashchange", routes.detail)
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
                .then(pokemons => {
                    const pokemonArray = pokemons.map(pokemon => this.parseData(pokemon))
                    localStorage.setItem("overview", JSON.stringify(pokemonArray))
                    return pokemonArray
                })
                // .then(pokemonArray => console.log(pokemonArray))
                 
        },
        getDataDetail: function(pokemon){
            return fetch (`${this.overviewUrl}/${pokemon}`)
                .then((response)=>{ 
                    if(response.status === 404){
                        render.noPokemonsFound(pokemon)
                    }
                    return response.json()
                })
                .then(jsonData => {
                    localStorage.setItem("details", JSON.stringify(jsonData))
                    console.log(jsonData)
                    return jsonData
                })
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
            // Vraagje aan docent (of wouter(beter wouter))
            // Je kan ook ook in de for loop alle data fetchen, waarom in een array stoppen om vervolgens Promise.all te gebruiken?
            // Gokje(Chainen werkt dan niet zoals het hoort. hieronder heb ik een addEvents functie maar die word eerder uitgevoerd omdat de api call eventjes duurt)
            console.log(min,max, "uitgevoerd")
            // render.removingElements()
            // for (let index = min; index < max; index++) {
            //     api.getDataDetail(index)
            //         .then(data=>render.makeElements(api.parseData(data)))
            // }
            // events.addEvents()
            // 


            // Is er nog een kortere manier om deze for loop te fixen?
            const promiseArray = []
            for (let index = min; index < max; index++) {
                promiseArray.push(api.getDataDetail(index))
            }
            Promise.all(promiseArray)
                .then(pokemons=>{
                    render.removingElements()
                    pokemons.forEach(pokemon=>{
                        render.makeElements(api.parseData(pokemon))
                    })
                    events.addEvents()
                })
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
            console.log("adding events")
            render.container().querySelectorAll(".pokemon").forEach((i)=>{
                i.addEventListener("mouseover", function(){
                    this.querySelector(".mainImage").classList.add("hoverAnimation")
                })
                i.addEventListener("mouseout", function(){
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
     localStorage.clear()
    // routes.overview()
    // console.log(JSON.parse(app.states.overview))
    api.getBgImage()
    app.init()
}())