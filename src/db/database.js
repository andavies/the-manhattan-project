const mongo = require('./mongo')

const dbName = "myLibrary"

const saveBook = async (book, username) => {
    try {
        await mongo.save(dbName, "books", { book, username })
    } catch (err) {
        console.log(err)
        return "Error connecting to database"
    }
}

const getBooks = async (userId) => {
    let books
    try {
        books = await mongo.getAll(dbName, "books", { userId })
    } catch (err) {
        throw "Error getting books"
    }
    return books
}

const getAllBooks = async () => {
    let books
    try {
        books = await mongo.getAll(dbName, "books")
    } catch (err) {
        throw "error getting books"
    }
    return books
}

const saveUser = async (user) => {
    try {
        const result = await mongo.save(dbName, "users", user)
        const userId = result.ops[0]["_id"]
        return userId
    } catch (err) {
        console.log(err)
        return "Error connecting to database"
    }
}

const getUser = async (username) => {    
    let user
    try {
        user = await mongo.getOne(dbName, "users", { username })
    } catch (err) {
        console.log(err)
        throw "User not found"
    }
    return user
}

exports.saveBook = saveBook
exports.getBooks = getBooks
exports.getAllBooks = getAllBooks
exports.saveUser = saveUser
exports.getUser  = getUser
