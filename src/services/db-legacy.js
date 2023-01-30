const Sequelize = require('sequelize');


const sequelize = new Sequelize(
    'manuvski',
    'manuvski',
    'manuvski',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
)

module.exports = sequelize

