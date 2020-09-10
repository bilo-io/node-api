// TODO: use "signale" logger https://www.npmjs.com/package/signale
const boxen = require('boxen')
const chalk = require('chalk')

const colorRestVerb = (requestMethod) => {
    switch (requestMethod) {
    case 'GET':
        return chalk.bgGreen(chalk.black(requestMethod))
    case 'POST':
        return chalk.bgYellow(chalk.black(requestMethod))
    case 'PATCH':
        return chalk.bgGrey(chalk.black(requestMethod))
    case 'DELETE':
        return chalk.bgRed(chalk.black(requestMethod))
    default:
        return chalk.hex('#00adee')(chalk.black(requestMethod))
    }
}

const loggerMiddleware = (req, res, next) => {
    const {
        body,
        url,
        query,
        method
    } = req

    const hasParams = Object.keys(query).length + Object.keys(body).length > 0
    const requestToPrettyString = `${colorRestVerb(method)} => ${chalk.bgBlack(chalk.whiteBright(url))}${
        hasParams
            ? chalk.bgGray(
                '\n',
                JSON.stringify(
                    {
                        query,
                        body
                    }, false, 2)
            )
            : ''
}`

    console.log(boxen(requestToPrettyString,
        {
            padding: 0,
            margin: 0,
            borderStyle: 'single'
        }))
    next()
}

module.exports = (server) => {
    server.use(loggerMiddleware)
}
