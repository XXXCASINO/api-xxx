const app = require('../app')
const route = require('../routes/login')

app.use('/api/', route)

module.exports = app