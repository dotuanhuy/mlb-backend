const sortOption= require('./sortOptions')

let sortColorLogosOptionTypeNameProduct = (optionColors, optionLogos, Op, optionTypeName, optionCategore) => {
    let colors = sortOption.sortOptionColor(optionColors, Op)
    let logos = sortOption.sortOptionLogos(optionLogos, Op)
    let typeName = sortOption.sortOptionTypeName(optionTypeName, Op)
    let tyepCateogre = optionCategore && optionCategore.length > 1 ? sortOption.sortOptionCategore(optionCategore, Op) : '' 
    let state = {}
    if (optionColors && optionColors.length > 0) {
        state = {
            ...state,
            ...colors,
        }
    }
    if (optionLogos && optionLogos.length > 0) {
        state = {
            ...state,
            ...logos
        }
    }
    if (optionTypeName) {
        state = {
            ...state,
            ...typeName
        }
    }
    if (optionCategore && optionCategore.length > 1) {        
        state = {
            ...state,
            ...tyepCateogre
        }
    }
    return state
}

let sortOptionTypeName = (optionTypeName, Op) => sortOption.sortOptionTypeName(optionTypeName, Op)

module.exports = {
    sortColorLogosOptionTypeNameProduct,
    sortOptionTypeName
}