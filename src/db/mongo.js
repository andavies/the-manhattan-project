const { MongoClient } = require('mongodb')
const url = "mongodb://localhost:27017"

const save = async (dbName, collection, data) => {  

    const client = await MongoClient.connect(url)    
    
    try {
        const db = client.db(dbName)
        return await db.collection(collection).insertOne(data)
    } finally {
        client.close()
    }
}

const getOne = async (dbName, collection, data) => {    

    const client = await MongoClient.connect(url)   
    
    try {
        const db = client.db(dbName)
        return await db.collection(collection).findOne(data)
    } finally {
        client.close()
    }
}

const getAll = async (dbName, collection, data) => {  

    const client = await MongoClient.connect(url)
    
    try {
        const db = client.db(dbName)
        return await db.collection(collection).find(data).toArray()       
    } finally {
        client.close()
    }
}

exports.save = save
exports.getOne  = getOne
exports.getAll = getAll