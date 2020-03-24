const FILE = process.env.PALS_FILE || 'pals'
const HOME = require('os').homedir()
const DATA = require('path').resolve(HOME, `.${FILE}.json`)
const { existsSync, writeFileSync } = require('fs')

let friends

if (existsSync(DATA)) {
  // make sure it's JSON!
  friends = require(DATA)
} else {
  writeFileSync(DATA, '{}')
  console.log(`${DATA} file created.`)
  process.exit(0)
}

module.exports = {
  DATA,
  friends,
  writeFileSync
}
