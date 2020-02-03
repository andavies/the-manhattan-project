const googlebooks = require('../api/googlebooks')
const db          = require('../db/database.js')

const addBook = async (isbn, username) => {
    let book
    try {
        book = await googlebooks.get("isbn:" + isbn)
    } catch (err) {
        throw "error calling googlebooks"
    }  

    if (book === null) {
        throw "Book not found"
    }

    try {
        await db.saveBook(book, username)
    } catch (err) {
        throw "error calling database"
    }
}

const getBooks = async (userId) => {
    let books
    try {
        books = await db.getBooks(userId)
    } catch (err) {
        throw "error calling database"
    }
    return books
}    

const getAllBooks = async () => {
    let books
    try {
        books = await db.getAllBooks()
    } catch (err) {
        throw "error calling database"
    }
    return books
}


exports.addBook = addBook
exports.getBooks = getBooks
exports.getAllBooks = getAllBooks

