const db = require('../models')
const Mars = db.Mars


async function getData() {

    console.log('ejecutando api')

    try {

        const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=' + process.env.API_KEY)
        const data = await response.json()
        const results = data.photos
        
       
        const dataResults = results.map(d => ({
            nasaId: d.id,
            sol: d.sol,
            image: d.img_src
        }));
        
        const itemstoCreation = []
        const existedResults = await Mars.findAll()
        console.log(existedResults)

        for (const item of dataResults) {
            const match = existedResults.find((existedResult) => existedResult.nasaId === item.nasaId)
            if (!match) {
                itemstoCreation.push(item)
            }
        }
        // console.log(itemstoCreation)
        
        if (itemstoCreation.length > 0) {
            Mars.bulkCreate(itemstoCreation)
            return 'Sincronizando base de datos'
        }

        return 'No hay datos nuevos para guardar en la base de datos'
    }
    catch (error) {
        console.log(error.message)

    }
}

module.exports = getData