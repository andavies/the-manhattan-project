const googlebooks = require('../api/googlebooks')
const db          = require('../db/database.js')

const addBook = async (isbn, username) => {    
    const book = await googlebooks.get("isbn:" + isbn)
    if (book === null) return false 
    await db.saveBook(book, username)        
    return true    
}

const getBooks = async (username) => {
    return await db.getBooks(username)
}    

const getAllBooks = async () => {
    return await db.getAllBooks()
}


exports.addBook = addBook
exports.getBooks = getBooks
exports.getAllBooks = getAllBooks