const roleService = require('../services/roleService')

let getAllRoles = async (req, res) => {
    try {
        let data = await roleService.getAlllRolesService()
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    getAllRoles,
}