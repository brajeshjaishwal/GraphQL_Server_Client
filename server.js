const express = require('express')
const gqlServer = require('express-graphql')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

require('./db/index')

const app = express()
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}
app.use(cors('*'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(async (req, res, next) => {
    var token = req.headers['auth']
    console.log(`auth header: ${token}`)
    try{
        console.log(typeof(token) + token)
        if(token === null || token === 'null' || token === undefined || token === '') {
            console.log('we dont have any token yet. lets wait.')
        }
        else{
            var currentUser = await jwt.verify(token, 'abcd')
        }
    }catch(err) {
        console.log(err)
    }
    next()
})
app.use('/gql', new gqlServer({
    schema: require('./gql/schema'),
    graphiql: true,
    context: {
        user: null
    }
}
))

app.listen('3300', () => {
    process.env.SECRET = '6&^%_+P:{}878&*&^&*!@#~afsf'
    console.log('server is running on 3300')
})