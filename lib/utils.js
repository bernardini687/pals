const DAYS = process.env.PALS_DAYS || 14

function capitalize (name) {
  return name
    .split(' ')
    .map(x => x[0].toUpperCase() + x.slice(1))
    .join(' ')
}

function composeReport (names) {
  if (names.length === 0) {
    process.exit(0)
  }
  return list(names) + ' would love a message from you.'
}

function daysAgo (count = 0) {
  return Date.now() - (86400000 * parseInt(count))
}

function list (names) {
  let list
  const size = names.length
  const formattedNames = names.map(x => capitalize(x))

  size === 1
    ? list = formattedNames[0]
    : list = formattedNames
      .slice(0, size - 1)
      .join(', ') +
      ' and ' +
      formattedNames[size - 1]

  return list
}

function prettify (objectEntries) {
  return objectEntries.map(([friend, date]) => (
    new Date(date).toLocaleDateString('it-IT').padEnd(11, ' ') +
    capitalize(friend)
  ))
}

function sanitize (string) {
  return string.trim().replace(/\s+/g, ' ')
}

function sort (friendsData) {
  return Object.entries(friendsData)
    .sort(([, dateA], [, dateB]) => (
      // old dates first.
      dateA > dateB ? 1 : dateA < dateB ? -1 : 0
    ))
}

function stale (friendsData) {
  return Object.keys(friendsData)
    .filter(name => friendsData[name] < new Date(daysAgo(DAYS)).toISOString())
}

module.exports = {
  capitalize,
  composeReport,
  list,
  prettify,
  sanitize,
  sort,
  stale
}
