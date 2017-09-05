const http = require('http')
const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const routes = require('./routes')

const app = express()
const server = http.createServer(app)

const redisOptions = {
    host: 'redis',
}
const sessionOptions = {
    store: new RedisStore(redisOptions),
    secret: 'thisIsNotASecret',
}

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)
app.use(session(sessionOptions))
app.use(express.static(`${__dirname}/public`))
app.use(routes)

server.listen(3000)
