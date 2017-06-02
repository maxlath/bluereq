const { expect } = require('chai')
const bluereq = require('../../lib/bluereq')
// test server config
const port = 9090
const host = `http://localhost:${port}`
const server = require('../fixtures/server')

describe('delete request', () => {
  describe('without errors', () => {})
  const expectedRes = { statusCode: 200, body: { message: 'DELETE complete.' } }
  const validConfig = { url: `${host}/json`, json: true }

  before(() => server.start(port))
  after(() => server.stop())

  describe('#delete(url)', () => {
    it('triggers .then(res) function', done => {
      bluereq.delete(validConfig.url)
        .then(res => {
          expect(res.statusCode).to.equal(expectedRes.statusCode)
          expect(res.body).to.deep.equal(expectedRes.body)
          done()
        })
    })
  })

  describe('#delete(config)', () => {
    it('triggers .then(res) function', done => {
      bluereq.delete(validConfig)
        .then(res => {
          expect(res.statusCode).to.equal(expectedRes.statusCode)
          expect(res.body).to.deep.equal(expectedRes.body)
          done()
        })
    })
  })

  describe('with errors', () => {
    const invalidConfig = { url: '' }
    describe('#delete(url)', () => {
      it('triggers .catch(err) function', done => {
        bluereq.delete(invalidConfig.url)
        .catch(err => {
          expect(err).to.exist
          done()
        })
      })
    })

    describe('#delete(config)', () => {
      it('triggers .catch(res) function', done => {
        bluereq.delete(invalidConfig)
        .catch(err => {
          expect(err).to.exist
          done()
        })
      })
    })
  })
})
