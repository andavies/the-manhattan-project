const mongo = require('./mongo')

const dbName = "myLibrary"

const saveBook = async (book, username) => {
    await mongo.save(dbName, "books", { book, username })    
}

const getBooks = async (username) => {
    return await mongo.getAll(dbName, "books", { username })    
}

const getAllBooks = async () => {
    return await mongo.getAll(dbName, "books")    
}

const saveUser = async (user) => {
    const result = await mongo.save(dbName, "users", user)
    const userId = result.ops[0]["_id"]
    return userId
}

const getUser = async (username) => {    
    return await mongo.getOne(dbName, "users", { username })    
}

exports.saveBook = saveBook
exports.getBooks = getBooks
exports.getAllBooks = getAllBooks
exports.saveUser = saveUser
exports.getUser  = getUser
