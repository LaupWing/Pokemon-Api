// Object literal Style programming
// This code below has to be converted to modules after it is finished
// TODO The make elements functions accepts a singel array item now.
// Change that to accepting array's
// First thing to-do = Converting to modules
// Second Renderfunctions accepting array's
(function(){
    const routes ={
        landingpage: function(){
            render.removingElements()
            if(window.location.hash === ""){
                console.log("Overview landingpage")
                routes.overviewLocalStorageCheck()
            }else{
                console.log("Detail landingpage")
                routes.detailLocalStorageCheck()
            }
        },
        detailLocalStorageCheck:function(){
            routes.localStorageCheck(app.states.details, routes.detailLocalstorage, routes.detailFetch)
        },
        overviewLocalStorageCheck:function(){
            routes.localStorageCheck(app.states.overview, routes.overviewLocalstorage, routes.overviewFetch)
        },
        overviewFetch: async function(){
            console.log("Overview by fetching, LocalStorage doesn't exist")
            const data = await api.getData()
            data.forEach(item=>render.makeElements(item))
            events.addEvents()
        },
        overviewLocalstorage:function(){
            console.log("Overview by localhost, LocalStorage exist")
            const array = app.states.overview
            array.forEach((pokemon)=>render.makeElements(pokemon))
            events.addEvents()
        },
        detailLocalstorage:function(){
            const array = app.states.details
            console.log("Checking if pokemon ID excist in the LocalStorage...")
            const pokemonDetail = array.find(function(pokemon){
                return pokemon.id === Number(window.location.hash.substr(1))
            })
            console.log(pokemonDetail)
            if(pokemonDetail){
                console.log("Id is available")
                render.makeDetailElements(pokemonDetail)
            }else{
                console.log("No id in the array")
                routes.detailFetch()
            }
            array.forEach(pokemon=>{
                pokemon.id === window.location.hash.substr(1)
            })
        },
        detailFetch:function(){
            console.log("Fetchig detail data")
            let id = window.location.hash.substr(1)
            api.getDataDetail(id, true)
                .then(pokemon=>render.makeDetailElements(pokemon))
        },
        localStorageCheck:function(storage, callbackStorageExist, callbackDoesntStorageExist){
            if(storage){
                console.log("LocalStorage exist")
                callbackStorageExist()
            }else{
                console.log("LocalStorage doesn't exist")
                callbackDoesntStorageExist()
            }
        },
        
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
            api.getBgImage()
            render.renderContainer()
            routes.landingpage()
        },
        urlChange: window.addEventListener("hashchange", routes.landingpage)
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
                    console.log(pokemonArray)
                    localStorage.setItem("overview", JSON.stringify(pokemonArray))
                    return pokemonArray
                })        
        },
        getDataDetail: function(pokemon, storage){
            return fetch (`${this.overviewUrl}/${pokemon}`)
                .then((response)=>{ 
                    if(response.status === 404){
                        render.noPokemonsFound(pokemon)
                    }
                    return response.json()
                })
                .then(jsonData => {
                    console.log("Saving it in localstorage= ", storage)
                    if(storage){
                        const array = (app.states.details) ? app.states.details : [];
                        array.push(jsonData)  
                        localStorage.setItem("details", JSON.stringify(array))
                    }
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
            api.checkImageAvailability(item.sprites.back_default)
            return {
                name: this.capatalize(item.name),
                id: item.id,
                defaultBack: api.checkImageAvailability(item.sprites.back_default),
                defaultFront: api.checkImageAvailability(item.sprites.front_default),
                shinyFront: api.checkImageAvailability(item.sprites.front_shiny),
                shinyBack: api.checkImageAvailability(item.sprites.back_shiny),
                type: item.types.map(type=>type.type.name),
                weight: item.weight,
                stats: item.stats.map(stat=>{
                    return {
                       statName: stat.stat.name,
                       baseStat: stat.base_stat  
                    }})
            }
        },
        checkImageAvailability(image){
            if(image){
                return image
            }
            return ""
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
            const results = randomNumbers.map(random=>this.getDataDetail(random, false))
            Promise.all(results)
                .then(pokemon=>{
                    render.removingElements()
                    const randomPokemonArray = pokemon.map(pokemon=>this.parseData(pokemon))
                    randomPokemonArray.forEach(pokemon=>render.makeElements(pokemon))
                    events.addEvents()
                })
        },
        betweenNumberPokemons:function(min, max){
            const promiseArray = []
            for (let index = min; index < max; index++) {
                promiseArray.push(api.getDataDetail(index, false))
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
            const results = await api.getDataDetail(document.querySelector(".searching").value, true)
            render.removingElements()
            console.log(results)
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
    app.init()
}())