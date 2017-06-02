const { expect } = require('chai')
const bluereq = require('../../lib/bluereq')
// test server config
const port = 9090
const host = `http://localhost:${port}`
const server = require('../fixtures/server')

describe('error object', () => {
  const expectedErr = { statusCode: 404, statusMessage: 'Not Found', body: { message: 'Page not found' } }
  const invalidConfig = { url: `${host}/invalidroute`, json: true }
  before(() => server.start(port))
  after(() => server.stop())

  it('has the right statusCode and body', done => {
    bluereq.get(invalidConfig.url)
    .catch(err => {
      expect(err.statusCode).to.equal(expectedErr.statusCode)
      expect(err.body).to.deep.equal(expectedErr.body)
      done()
    })
    return
  })
})
