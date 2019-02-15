(function(){
    const router ={
        overview: function(){

        }
    }
    const api={
        overviewUrl: "https://pokeapi.co/api/v2/pokemon",
        getData: function(url = this.overviewUrl){
            return fetch(url)
                .then(data => data.json())
                .then(jsonData => jsonData.results)
                .then(data => data.map(pokemon=>pokemon.url))
                .then(pokemonUrl=>{
                    const promisses = pokemonUrl.map(pokemonUrl=>{
                        return fetch(pokemonUrl)
                            .then(pokemons => pokemons)
                    })
                    Promise.all(promisses).then(data=>console.log(data))
                    // return Promise.all(promisses)
                })
                
        }

    }
    const render={

    }
    api.getData()
}())