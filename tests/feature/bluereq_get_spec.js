const { expect } = require('chai')
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
          expect(res.statusCode).to.equal(expectedRes.statusCode)
          expect(res.body.message).to.equal(expectedRes.body.message)
          done()
        })
      })
    })

    describe('#get(config)', () => {
      it('triggers .then(res) function', done => {
        bluereq.get(validConfig)
        .then(res => {
          expect(res.statusCode).to.equal(expectedRes.statusCode)
          expect(res.body.message).to.equal(expectedRes.body.message)
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
          expect(err).to.exist()
          done()
        })
      })
    })

    describe('#get(config)', () => {
      it('triggers .catch(res) function', done => {
        bluereq.get(invalidConfig)
        .catch(err => {
          expect(err).to.exist()
          done()
        })
      })
    })
  })
})
