// https://github.com/azat-co/cheatsheets/tree/master/express4
const pkg = require('./package.json')
const chalk = require('chalk')
const signale = require('signale')
const os = require('os')
const boxen = require('boxen')
const withCluster = process.argv.includes(['withCluster'])
const cluster = require('cluster')

const useClusters = cluster.isMaster && withCluster
const cpuCount = os.cpus().length

if (useClusters) {
    // Master
    // ======

    console.log(`VISION-SCHOOLS: Forking ${cpuCount} CPU's`)
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork()
    }
} else {
    // Worker
    // ======
    console.clear()
    // eslint-disable-next-line no-unused-vars
    const mongo = require('./src/services/mongo')
    const express = require('express')
    const app = express()
    const env = require('./src/util/env')

    const apiRouter = require('./src/api/router')
    const middleware = require('./src/api/middleware')

    // #region API
    middleware(app)
    apiRouter(app)
    app.get('/api', (req, res) => {
        const { name, version } = pkg
        res.send({
            name,
            version
        })
    })
    // #endregion

    app.listen(env.port, () => {
        const apiDetails = `${chalk.cyan(pkg.name)}  version: ${chalk.greenBright(pkg.version)}`
        const apiUrl = `${chalk.hex('#00adee')('Node.js')}: ${chalk.yellow(`http://localhost:${env.port}/api`)}`

        console.log(boxen(apiDetails,
            {
                padding: 1,
                margin: 0,
                borderStyle: 'double'
            }))

        console.log(apiDetails)
        console.log(apiUrl)

        // signale.success('API launch')
        // signale.note(`Cores: ${cpuCount}`)
        // signale[withCluster ? 'success' : 'warn']('Load balancing: ', withCluster)
        // signale.success(`${apiUrl}`)
    })
}
