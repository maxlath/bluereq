const { expect } = require('chai')
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
          expect(res.statusCode).to.equal(expectedRes.statusCode)
          expect(res.body).to.equal(expectedRes.body)
          done()
        })
        return
      })
    })

    describe('#head(config)', () => {
      it('triggers .then(res) function', done => {
        bluereq.head(validConfig)
        .then(res => {
          expect(res.statusCode).to.equal(expectedRes.statusCode)
          expect(res.body).to.equal(expectedRes.body)
          done()
        })
        return
      })
    })
  })

  describe('with errors', () => {
    const invalidConfig = { url: '' }
    describe('#head(url)', () => {
      it('triggers .catch(err) function', done => {
        bluereq.head(invalidConfig.url)
        .catch(err => {
          expect(err).to.exist
          done()
        })
        return
      })
    })

    describe('#head(config)', () => {
      it('triggers .catch(res) function', done => {
        bluereq.head(invalidConfig)
        .catch(err => {
          expect(err).to.exist
          done()
        })
        return
      })
    })
  })
})
