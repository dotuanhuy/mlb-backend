
const optionCategory = (type) => {
    switch(type) {
        case 'GS': 
            return [
                1,
                2,
            ]
        case 'TB': 
            return [
                3,
                4,
            ]
        case 'MN': 
            return [
                5,
                6,
            ]
        case 'AQ': 
            return [
                7,
                8,
                9,
                10,
            ]
        default: 
            return []
    }
}

module.exports = {
    optionCategory
}
