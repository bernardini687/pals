const { report, reset, status, touch } = require('./actions')

module.exports = argv => {
  if (reset.can(argv)) {
    reset.do()
  } else if (status.can(argv)) {
    status.do()
  } else if (report.can(argv)) {
    report.do()
  } else if (touch.can(argv)) {
    touch.do(argv)
  }
  process.exit(0)
}
