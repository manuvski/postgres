const db = require('../models')
const User = db.User
const Mars = db.Mars

const getUserById = async (id) => {
    const user = await User.findByPK(id)
    return user
}
const getUserByEmail = async (email) => {
    return await User.findOne({where: {email:email} })
}
const toggleTaskToFavorite = async ({id, nasaId}) => {
    let user = await User.findByPK(id)
    let currentFavList = user.get('favorites')
    let newFavsList = currentFavList.filter(()=> true).map((id_)=> Number(id_)) 

    const existed = currentFavList.includes(Number(nasaId))
    // const marsDB = await Mars.findByPK(nasaId)
    let isAdded = false

    if (existed) {
        newFavsList = currentFavList.filter(item => Number(item) !== Number(nasaId))
    } else {
        const fav = await Mars.findByPK(nasaId)
        if (!fav) {
            throw new Error ('No exists data in database')
        } else {
            newFavsList.push(nasaId)
            isAdded = true
        }
    }

    // await User.findByIdAndUpdate(id, { favorites: newFavsList})

    await User.update({ favorites: newFavsList }, { where: {id: id }})
    user = await User.findByPK(id, { attributes: { exclude: ['password', 'salt']}})

    // let userUpdated = await getUserBy(id)
    // userUpdated = JSON.parse(JSON.stringify(userUpdated))

    // const {password, salt, ...userUpdated_} = userUpdated

    // return userUpdated_

    return {user:user, isAdded:isAdded}
}

module.exports = {
    toggleTaskToFavorite,
    getUserByEmail,
    getUserById
}