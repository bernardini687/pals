const { exitOnEmpty, prettify, sort } = require('../utils')
const { friends } = require('../loader')

module.exports = {
  can (argv) {
    return !!argv.toString().match(/^status!$/)
  },

  do () {
    exitOnEmpty(friends)

    console.log(prettify(sort(friends)).join('\n'))
    return null
  }
}
