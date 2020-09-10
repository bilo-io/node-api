const os = require('os')
const pkg = require('../../package.json')
const env = process.env
const pid = process.pid
const port = env.port || 4000
const skipCodeSigning = true

// Electron
if (skipCodeSigning) {
    process.env.CSC_IDENTITY_AUTO_DISCOVERY = false
}

const envUrl = {
    development: `http://localhost:${port}`,
    sandbox: 'http://vis-ion.gitlab.io/studio',
    production: 'https://studio.vis-ion.io'
}

const visionEnv = {
    appName: pkg.name,
    version: pkg.version,
    appUrl: envUrl[env.NODE_ENV],
    environment: env.NODE_ENV,
    port,
    pid,
    platform: os.platform()
}

module.exports = visionEnv
