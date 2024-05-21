const app = require('../app')
const route = require('../routes/payment')

app.use('/api/', route)

module.exports = app