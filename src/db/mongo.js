const { MongoClient } = require('mongodb')
const url = "mongodb://localhost:27017"

const save = async (dbName, collection, data) => {    
    let client
    try {
        client = await MongoClient.connect(url)
    } catch (err) {
        throw "Unable to connect to database"
    }
    
    try {
        const db = client.db(dbName)
        const result = await db.collection(collection).insertOne(data)
        return result
    } catch (err) {
        return "Error connecting to database"
    } finally {
        client.close()
    }
}

const getOne = async (dbName, collection, data) => {    
    let client
    try {
        client = await MongoClient.connect(url)
    } catch (err) {
        throw "Unable to connect to database"
    }
    
    let result
    try {
        const db = client.db(dbName)
        result = await db.collection(collection).findOne(data)
    } catch (err) {
        return "Unable to find record"
    } finally {
        client.close()
    }
    return result
}

const getAll = async (dbName, collection, data) => {    
    let client
    try {
        client = await MongoClient.connect(url)
    } catch (err) {
        throw "Unable to connect to database"
    }
    
    let results = []
    try {
        const db = client.db(dbName)
        results = await db.collection(collection).find(data).toArray()       
    } catch (err) {
        return "Unable to find record"
    } finally {
        client.close()
    }
    
    return results
}

exports.save = save
exports.getOne  = getOne
exports.getAll = getAll