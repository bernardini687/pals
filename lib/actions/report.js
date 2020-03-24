const { composeReport, stale } = require('../utils')
const { friends } = require('../loader')

module.exports = {
  can (argv) {
    return argv.length === 0
  },

  do () {
    console.log(composeReport(stale(friends)))
    return null
  }
}
