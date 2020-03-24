const { exitOnEmpty, composeReport, stale } = require('../utils')
const { friends } = require('../loader')

module.exports = {
  can (argv) {
    return argv.length === 0
  },

  do () {
    exitOnEmpty(friends)
    console.log(composeReport(stale(friends)))
  }
}
