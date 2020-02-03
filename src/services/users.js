const db = require('../db/database')
const argon2 = require('argon2')

const createUser = async (user) => {

    // todo: validation on username and password


    try {
        user.hash = await argon2.hash(user.password)
    } catch (err) {
        throw "Unable to hash password"
    }
    delete user.password    

    const userId = await db.saveUser(user)
    console.log(`User ${userId} saved to database`)
    return userId
}

exports.createUser = createUser