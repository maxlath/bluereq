const should = require('should')
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
          should(res.statusCode).equal(expectedRes.statusCode)
          should(res.body.message).equal(expectedRes.body.message)
          should(res.body.req).deepEqual({})
          done()
        })
      })
    })

    describe('#put(config)', () => {
      it('triggers .then(res) function', done => {
        bluereq.put(validConfig)
        .then(res => {
          should(res.statusCode).equal(expectedRes.statusCode)
          should(res.body).deepEqual(expectedRes.body)
          done()
        })
      })
    })
  })

  describe('with errors', () => {
    const invalidConfig = { url: '' }
    describe('#put(url)', () => {
      it('triggers .catch(err) function', done => {
        bluereq.put(invalidConfig.url)
        .catch(err => {
          should(err).be.ok()
          done()
        })
      })
    })

    describe('#put(config)', () => {
      it('triggers .catch(res) function', done => {
        bluereq.put(invalidConfig)
        .catch(err => {
          should(err).be.ok()
          done()
        })
      })
    })
  })
})
