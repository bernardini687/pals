/* eslint-env mocha */

const { strictEqual: assertEqual, deepStrictEqual } = require('assert')
const {
  capitalize,
  composeReport,
  list,
  prettify,
  sanitize,
  sort,
  stale
} = require('./utils')

const friendsData = {
  finn: '2020-01-01T12:00:00.000Z',
  jake: new Date().toISOString(),
  'ice king': '2019-12-25T12:00:00.000Z'
}

describe('capitalize', () => {
  it('works for names of one word', async () => {
    const subject = 'finn'
    assertEqual('Finn', capitalize(subject))
  })

  it('works for names of more words', async () => {
    const subject = 'ice king'
    assertEqual('Ice King', capitalize(subject))
  })
})

describe('composeReport', () => {
  it('reports one friend', async () => {
    const subject = ['finn']
    assertEqual(
      'Finn would love a message from you.',
      composeReport(subject)
    )
  })

  it('reports more friends', async () => {
    const subject = ['finn', 'ice king']
    assertEqual(
      'Finn and Ice King would love a message from you.',
      composeReport(subject)
    )
  })
})

describe('list', () => {
  it('lists one friend', async () => {
    const subject = ['finn']
    assertEqual('Finn', list(subject))
  })

  it('lists two friends', async () => {
    const subject = ['finn', 'jake']
    assertEqual('Finn and Jake', list(subject))
  })

  it('lists more friends', async () => {
    const subject = ['finn', 'jake', 'ice king']
    assertEqual('Finn, Jake and Ice King', list(subject))
  })
})

describe('prettify', () => {
  it('returns a printable list', async () => {
    // ignore Jake to avoid complications with current date.
    const { jake, ...others } = friendsData

    const subject = Object.entries(others)
    const actual = ['1/1/2020   Finn', '25/12/2019 Ice King']

    deepStrictEqual(actual, prettify(subject))
  })
})

describe('sanitize', () => {
  it('strips a string', async () => {
    const subject = '  finn'
    assertEqual('finn', sanitize(subject))
  })

  it('replaces any white-space with a single space', async () => {
    const subject = 'ice   king   '
    assertEqual('ice king', sanitize(subject))
  })

  it('works with many words', async () => {
    const subject = 'himalaya   reel   to reel'
    assertEqual('himalaya reel to reel', sanitize(subject))
  })
})

describe('sort', () => {
  it('sorts data by dates', async () => {
    const subject = friendsData
    const actual = ['ice king', 'finn', 'jake']

    deepStrictEqual(actual, sort(subject).map(x => x[0]))
  })
})

describe('stale', () => {
  it('filters data for old dates', async () => {
    const subject = friendsData
    const actual = ['finn', 'ice king']

    deepStrictEqual(actual, stale(subject))
  })
})
