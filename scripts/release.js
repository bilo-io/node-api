/* eslint-disable quotes */
console.log(`
NOTE: you might need to run this to get all dependencies:

yarn add semver readline file-system colors --dev

`)

// eslint-disable-next-line no-unused-vars
const colors = require('colors')
const exec = require('child_process').exec
const fs = require('fs')
const npmPackage = require('../package.json')
const readline = require('readline')
const semver = require('semver')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log(`bump: "${npmPackage.name}"`.cyan + ` v ${npmPackage.version}`.green)
const bumpMessage = 'Type a description of the release:\n\n'
const bumpQuestion = `\nWhat kind of changes are you releasing?\n` +
`\n1) ` + `patch:`.cyan + ` ✓ a bugfix release or only has other minor changes with no changes to the interfaces`.green +
`\n2) ` + `minor:`.cyan + ` ~ a change that has new features, but is backwards-compatible with any existing consumers`.yellow +
`\n3) ` + `major:`.cyan + ` ! a change that includes any backwards-incompatible change`.red +
`\n\nchoose: `

rl.question(bumpQuestion, (answer) => {
    setNewVersion(Number(answer))
})

const updateFile = (fileName, update, callback) => {
    fs.readFile(fileName, (err1, data) => {
        fs.writeFile(fileName, `${update}\n\n${data}`, 'utf8', (err) => {
            if (err) {
                console.err('could not update changelog')
                process.exit(1)
            }
            callback()
        })
    })
}

const updateChangeLog = (newVersion) => {
    rl.question(bumpMessage, (answer) => {
        const updateMessage = `## v${newVersion}\n\n- ${answer}`
        updateFile('CHANGELOG.md', updateMessage, () => {
            updatePackage(npmPackage.version, newVersion)
        })
        rl.close()
    })
}

const updatePackage = (oldVersion, newVersion) => {
    console.log(`\n- "version": "${npmPackage.version}"`.red + `\n+ "version": "${newVersion}"\n`.green)
    pushBump(newVersion)
    // fs.readFile('package.json', 'utf8', (err, data) => {
    //     // const fileUpdate = data.replace(
    //     //     `"version": "${oldVersion}"`,
    //     //     `"version": "${newVersion}"`
    //     // )
    //     fs.writeFile('package.json', fileUpdate, (err) => {
    //         if (err) {
    //             console.err('could not update package.json\n\n'.red, err)
    //         }

    //     })
    // })
}

const setNewVersion = (bumpType) => {
    const version = npmPackage.version
    let newVersion

    switch (bumpType) {
    case 1:
        newVersion = `${semver.major(version)}.${semver.minor(version)}.${Number(semver.patch(version)) + 1}`
        break
    case 2:
        newVersion = `${semver.major(version)}.${Number(semver.minor(version)) + 1}.0`
        break
    case 3:
        newVersion = `${Number(semver.major(version)) + 1}.0.0`
        break
    default:
        console.log(`\nYou need to pick 1 | 2 | 3 for a semver update\n`.yellow)
        process.exit(1)
    }

    console.log(`\n- ${npmPackage.version}`.red + `\n+ ${newVersion}\n`.green)
    updateChangeLog(newVersion)
}

const pushBump = (newVersion) => {
    exec(`git add -u`, (err, stdout, stderr) => {
        if (err) {
            process.exit(1)
        }
        exec(`git commit -m "version bump: v${newVersion}"`, (err, stdout, stderr) => {
            if (err) {
                process.exit(1)
            }
            exec(`git tag -a v${newVersion} -m "version bump: v${newVersion}"`, (err, stdout, stderr) => {
                if (err) {
                    process.exit(1)
                }
                exec(`git push origin master --tags`, (err, stdout, stderr) => {
                    if (err) {
                        process.exit(1)
                    }
                })
            })
        })
    })
}
