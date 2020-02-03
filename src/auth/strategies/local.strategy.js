const passport = require('passport')
const { Strategy } = require('passport-local')
const db = require('../../db/database')
const argon2 = require('argon2')

module.exports = function localStrategy() {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {
            
            (async () => {
                let user
                try {
                    user = await db.getUser(username)
                } catch (err) {
                    done(null, false)
                }     

                try {
                    if (user !== null && await argon2.verify(user.hash, password)) {
                         done(null, { id : user["_id"], username: user["username"] })
                    } else {
                        done(null, false)
                    }
                } catch (err) {
                    done(null, false)
                }                
            })() 
        }
    ))
}