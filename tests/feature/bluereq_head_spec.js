const should = require('should')
const bluereq = require('../../lib/bluereq')
// test server config
const port = 9090
const host = `http://localhost:${port}`
const server = require('../fixtures/server')

describe('head request', () => {
  describe('without errors', () => {
    const expectedRes = { statusCode: 200, body: undefined }
    const validConfig = { url: `${host}/json`, json: true }

    before(() => server.start(port))
    after(() => server.stop())

    describe('#head(url)', () => {
      it('triggers .then(res) function', done => {
        bluereq.head(validConfig.url)
        .then(res => {
          should(res.statusCode).equal(expectedRes.statusCode)
          should(res.body).equal(expectedRes.body)
          done()
        })
      })
    })

    describe('#head(config)', () => {
      it('triggers .then(res) function', done => {
        bluereq.head(validConfig)
        .then(res => {
          should(res.statusCode).equal(expectedRes.statusCode)
          should(res.body).equal(expectedRes.body)
          done()
        })
      })
    })
  })

  describe('with errors', () => {
    const invalidConfig = { url: '' }
    describe('#head(url)', () => {
      it('triggers .catch(err) function', done => {
        bluereq.head(invalidConfig.url)
        .catch(err => {
          should(err).be.ok()
          done()
        })
      })
    })

    describe('#head(config)', () => {
      it('triggers .catch(res) function', done => {
        bluereq.head(invalidConfig)
        .catch(err => {
          should(err).be.ok()
          done()
        })
      })
    })
  })
})
