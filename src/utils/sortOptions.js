let sortOptionColor = (optionColors, Op) => optionColors && optionColors.length > 0 ? {
    listColor: {
        [Op.or]: [
            {
                [Op.substring]: optionColors[0]
            },
            optionColors[1] ? {
                [Op.substring]: optionColors[1]
            } : '',
            optionColors[2] ? {
                [Op.substring]: optionColors[2]
            } : '',
            optionColors[3] ? {
                [Op.substring]: optionColors[3]
            } : '',
            optionColors[4] ? {
                [Op.substring]: optionColors[4]
            } : '',
            optionColors[5] ? {
                [Op.substring]: optionColors[5]
            } : '',
            optionColors[6] ? {
                [Op.substring]: optionColors[6]
            } : '',
            optionColors[7] ? {
                [Op.substring]: optionColors[7]
            } : '',
            optionColors[8] ? {
                [Op.substring]: optionColors[8]
            } : '',
            optionColors[9] ? {
                [Op.substring]: optionColors[9]
            } : '',
            optionColors[10] ? {
                [Op.substring]: optionColors[10]
            } : '',
        ]
    }
} : ''

let sortOptionLogos = (optionLogos, Op) => optionLogos && optionLogos.length > 0 ? {
    logoId: {
        [Op.or]: [
            {
                [Op.like]: optionLogos[0]
            },
            optionLogos[1] ? {
                [Op.like]: optionLogos[1]
            } : '',
            optionLogos[2] ? {
                [Op.like]: optionLogos[2]
            } : '',
            optionLogos[3] ? {
                [Op.like]: optionLogos[3]
            } : '',
            optionLogos[4] ? {
                [Op.like]: optionLogos[4]
            } : '',
            optionLogos[5] ? {
                [Op.like]: optionLogos[5]
            } : '',
            optionLogos[6] ? {
                [Op.like]: optionLogos[6]
            } : '',
            optionLogos[7] ? {
                [Op.like]: optionLogos[7]
            } : '',
            optionLogos[8] ? {
                [Op.like]: optionLogos[8]
            } : '',
            optionLogos[9] ? {
                [Op.like]: optionLogos[9]
            } : '',
            optionLogos[10] ? {
                [Op.like]: optionLogos[10]
            } : '',
        ]
    }
} : ''

let sortOptionTypeName = (optionTypeName, Op) => optionTypeName ? {
    name: {
        [Op.substring]: optionTypeName
    }
} : ''

let sortOptionCategore = (optionCategore, Op) => optionCategore && optionCategore.length > 1 ? {
    categoresId: {
        [Op.or]: [
            {
                [Op.like]: optionCategore[0]
            },
            optionCategore[1] ? {
                [Op.like]: optionCategore[1]
            } : '',
            optionCategore[2] ? {
                [Op.like]: optionCategore[2]
            } : '',
            optionCategore[3] ? {
                [Op.like]: optionCategore[3]
            } : '',
        ]
    }
} : optionCategore

module.exports = {
    sortOptionColor,
    sortOptionLogos,
    sortOptionTypeName,
    sortOptionCategore
}