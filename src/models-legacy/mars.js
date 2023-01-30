const { STRING } = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../services/db')

const Mars = db.define('mars', {
    id: {
        type: Sequelize.UUIDV4,
         defaultValue: Sequelize.UUIDV4, 
        primaryKey: true
    },
    nasaId: {
        type: Sequelize.INTEGER,
    },
    sol: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    }

},)

module.exports = Mars

