const cors = require('cors')

module.exports = (server) => {
    server.use(cors())
    server.options('*', cors())
}
