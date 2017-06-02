const { expect } = require('chai')
const bluereq = require('../../lib/bluereq')
// test server config
const port = 9090
const host = `http://localhost:${port}`
const server = require('../fixtures/server')

describe('put request', () => {
  describe('without errors', () => {
    const validConfig = { url: `${host}/json`, json: { exampleParam: 'exampleValue' } }
    const expectedRes = { statusCode: 200, body: { message: 'PUT complete.', req: validConfig.json } }

    before(() => server.start(port))
    after(() => server.stop())

    describe('#put(url)', () => {
      it('triggers .then(res) function', done => {
        bluereq.put(validConfig.url)
        .then(res => {
          expect(res.statusCode).to.equal(expectedRes.statusCode)
          expect(res.body.message).to.equal(expectedRes.body.message)
          expect(res.body.req).to.deep.equal({})
          done()
        })
        return
      })
    })

    describe('#put(config)', () => {
      it('triggers .then(res) function', done => {
        bluereq.put(validConfig)
        .then(res => {
          expect(res.statusCode).to.equal(expectedRes.statusCode)
          expect(res.body).to.deep.equal(expectedRes.body)
          done()
        })
        return
      })
    })
  })

  describe('with errors', () => {
    const invalidConfig = { url: '' }
    describe('#put(url)', () => {
      it('triggers .catch(err) function', done => {
        bluereq.put(invalidConfig.url)
        .catch(err => {
          expect(err).to.exist
          done()
        })
        return
      })
    })

    describe('#put(config)', () => {
      it('triggers .catch(res) function', done => {
        bluereq.put(invalidConfig)
        .catch(err => {
          expect(err).to.exist
          done()
        })
        return
      })
    })
  })
})
