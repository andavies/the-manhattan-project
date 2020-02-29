const axios = require('axios')
require('dotenv').config()

const baseUrl = "https://www.googleapis.com/books/v1/volumes"

const get = async (query) => {

    params = {
        q : query,
        apiKey : process.env.GOOGLE_APIKEY
    }     
    
    let data = null
    try {
        ({ data } = await axios.get(baseUrl, { params : params }))
    } catch (err) {    
        console.error(err)    
        return null
    }

    if (data.totalItems > 0) {
        return data.items[0].volumeInfo
    } else {
        return null
    }
}

exports.get = get