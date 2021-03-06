const should = require('should')
const bluereq = require('../../lib/bluereq')
// test server config
const port = 9090
const host = `http://localhost:${port}`
const server = require('../fixtures/server')

describe('general', () => {
  const validConfig = { url: `${host}/json`, json: true }

  before(() => server.start(port))
  after(() => server.stop())

  it('should default to config.gzip=true', done => {
    bluereq.get(validConfig)
    .then(res => {
      should(res.body.reqHeaders['accept-encoding']).equal('gzip, deflate')
      done()
    })
  })

  it('should still accept a false gzip option', done => {
    const config = Object.assign({}, validConfig)
    config.gzip = false
    bluereq.get(config)
    .then(res => {
      should(res.body.reqHeaders['accept-encoding']).not.equal('gzip, deflate')
      done()
    })
  })
})
