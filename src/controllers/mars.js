const db = require('../models')
const Mars = db.Mars

const getMarsList = async () => {
    const mars = await Mars.findAll()
    return mars
}

const getMarsById = async (id) => {
    const mars = await Mars.findByPK(id)
    return mars
}

const createMars = async ({ name }) => {
    const mars = await Mars.create({ name })
    return mars
}

const updateMars = async (id, data) => {
    const mars = await Mars.update(data, {
        where: {
            id
        }
    })
    return mars
}

const removeMars = async (id) => {
    await Mars.destroy({
        where: {
            id
        }
    })

    return true
}

module.exports = {
    getMarsList,
    getMarsById,
    createMars,
    updateMars,
    removeMars
}