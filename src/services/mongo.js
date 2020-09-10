// #region Modules
require('dotenv').config()
const mongoose = require('mongoose')
const signale = require('signale')
const c = require('chalk')
// #endregion

const dbName = 'node-api'
const dbUrl = `mongodb://localhost:27017/${dbName}`

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(response => {
        signale.success(`${c.green('MongoDB')}: connection ${c.green('SUCCESS')}`)
    })
    .catch(error => {
        console.log('Error', error)
        signale.error(`${c.green('MongoDB')}: connect => ${c.red('ERROR')}`, error)
    })

const db = mongoose.connection

db.on('error', (error) => {
    signale.error(c.red(error))
    signale.error(`${c.green('MongoDB')}: ${c.red(error)}`)
})

db.once('open', function () {
    signale.await(`${c.green('MongoDB')}: initialising`)
    signale.note(`${c.green('MongoDB')}: connection.name: "${c.yellow(db.name)}"`)
})
