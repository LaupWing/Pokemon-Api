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