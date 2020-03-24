const shapeDate = require('shape-date')
const { DATA, friends, writeFileSync } = require('../loader')
const { sanitize } = require('../utils')

module.exports = {
  can (argv) {
    return !!argv.toString()
      .match(/^[ \u00c0-\u01ffa-zA-Z'-]+(,\d{1,2}(-\d{1,2}(-\d{4})?)?)?$/)
  },

  do ([friend, date]) {
    friends[sanitize(friend)] = shapeDate(date)
    writeFileSync(DATA, JSON.stringify(friends))
  }
}
