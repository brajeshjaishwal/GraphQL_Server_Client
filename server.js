const express = require('express')
const gqlServer = require('express-graphql')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

require('./db/index')

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/gql', new gqlServer({
    schema: require('./gql/schema'),
    graphiql: true,
    context: {
        user: null
    }
}
))

app.listen('3300', () => {
    console.log('server is running on 3300')
})