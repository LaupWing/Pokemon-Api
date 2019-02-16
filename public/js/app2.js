// import { makeElements } from "./utilities";

(function(){
    // const router ={
    //     overview: async function(){
    //             const data = await api.getData(),
        
        
    //     }
    // }
    const states = {
        overviewArray:[],
        statesAarray:[]
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
                .then(pokemons => api.overviewArray = pokemons.map(pokemon => api.parseData(pokemon)))
                .then(x=>console.log(api.overviewArray))    
        },
        getDataDetail: function(url){
            return fetch (url)
                .then(data=> data.json())
                .then(jsonData => console.log(jsonData))
        },
        parseData:function(item){
            return {
                name: api.capatalize(item.name),
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
        	
    }
    api.getDataDetail("https://pokeapi.co/api/v2/pokemon/1")
    console.log(api.getData())
}())