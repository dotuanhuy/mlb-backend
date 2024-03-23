
const optionCategory = (type) => {
    switch(type) {
        // case 'GS': 
        //     return [
        //        { categoryDetailId: 1 },
        //        { categoryDetailId: 2 },
        //     ]
        // case 'TB': 
        //     return [
        //        { categoryDetailId: 3 },
        //        { categoryDetailId: 4 },
        //     ]
        // case 'MN': 
        //     return [
        //        { categoryDetailId: 5 },
        //        { categoryDetailId: 6 },
        //     ]
        // case 'AQ': 
        //     return [
        //        { categoryDetailId: 7 },
        //        { categoryDetailId: 8 },
        //        { categoryDetailId: 9 },
        //        { categoryDetailId: 10 },
        //     ]
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
