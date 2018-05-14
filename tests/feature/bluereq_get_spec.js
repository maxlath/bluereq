const should = require('should')
const bluereq = require('../../lib/bluereq')
// test server config
const port = 9090
const host = `http://localhost:${port}`
const server = require('../fixtures/server')

describe('get request', () => {
  describe('without errors', () => {
    const expectedRes = { statusCode: 200, body: { message: 'GET complete.' } }
    const validConfig = { url: `${host}/json`, json: true }

    before(() => server.start(port))
    after(() => server.stop())

    describe('#get(url)', () => {
      it('triggers .then(res) function', done => {
        bluereq.get(validConfig.url)
        .then(res => {
          should(res.statusCode).equal(expectedRes.statusCode)
          should(res.body.message).equal(expectedRes.body.message)
          done()
        })
      })
    })

    describe('#get(config)', () => {
      it('triggers .then(res) function', done => {
        bluereq.get(validConfig)
        .then(res => {
          should(res.statusCode).equal(expectedRes.statusCode)
          should(res.body.message).equal(expectedRes.body.message)
          done()
        })
      })
    })
  })

  describe('with errors', () => {
    const invalidConfig = { url: '' }
    describe('#get(url)', () => {
      it('triggers .catch(err) function', done => {
        bluereq.get(invalidConfig.url)
        .catch(err => {
          should(err).be.ok()
          done()
        })
      })
    })

    describe('#get(config)', () => {
      it('triggers .catch(res) function', done => {
        bluereq.get(invalidConfig)
        .catch(err => {
          should(err).be.ok()
          done()
        })
      })
    })
  })
})
