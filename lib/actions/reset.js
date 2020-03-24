const { DATA, writeFileSync } = require('../loader')

module.exports = {
  can (argv) {
    return !!argv.toString().match(/^reset!$/)
  },

  do () {
    writeFileSync(DATA, '{}')
  }
}
