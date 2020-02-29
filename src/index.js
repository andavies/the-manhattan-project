const express = require('express')
const app = express()
const port = 3000

app.set('views', './src/views')
app.set('view engine', 'ejs')

const bookService = require('./services/books')
const userService = require('./services/users') 

// auth
require('dotenv').config()
const passport     = require('passport')
const cookieParser = require('cookie-parser')
const session      = require('express-session')
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const sessionSecret = process.env.SESSION_SECRET
app.use(session({ secret : sessionSecret }))
require('./auth/passport')(app)


const authenticate = (req, res) => {
    if (req.user) return
    else return res.redirect('/login')
}

app.get('/', (req, res) => {
    authenticate(req, res)
    res.sendFile('views/index.html', { root: __dirname })
})

app.get('/add-book', (req, res) => {
    authenticate(req, res)
    res.sendFile('views/add-book.html', { root: __dirname })
})

app.get('/my-books', async (req, res) => {
    authenticate(req, res)
    let books
    try {
        books = await bookService.getBooks(req.user.username)
    } catch (err) {
        res.send(err)
    }
    res.render('my-books', { books: books })
})

app.get('/search-books', async (req, res) => {
    authenticate(req, res)
    let books
    try {
        books = await bookService.getAllBooks()
    } catch (err) {
        res.send(err)
    }
    res.render('search-books', { books: books })
})

app.get('/login', (req, res) => {
    if (req.user) res.redirect('/')
    res.sendFile('views/login.html', { root: __dirname })
})

app.get('/sign-up', (req, res) => {
    if (req.user) res.redirect('/')
    res.sendFile('views/sign-up.html', { root: __dirname })
})

app.post('/auth', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))  

app.post('/sign-up', async (req, res) => {

    let userId
    try {        
        userId = await userService.createUser(req.body)        
    } catch (err) {
        console.error(err)
        res.send("Unable to create user - see logs")
    }  
    
    req.login({ id : userId, username: req.body.username }, () => {
        res.redirect('/')
    })
})

app.post('/add-book', async (req, res) => {
    authenticate(req, res)
    let bookFound
    try {
        bookFound = await bookService.addBook(req.body.isbn, req.user.username)        
    } catch (err) {
        console.error(err)
        res.send("Unable to add book - see logs")
    } 

    if (bookFound) {
        res.send(`Book ${req.body.isbn} added`)
    } else {
        res.send("Book not found")
    }              
})

app.post('/logout', function (req, res){
    req.session.destroy(function (err) {
        res.redirect('/')
    })
})


app.listen(port, () => console.log(`App listening on port ${port}!`))