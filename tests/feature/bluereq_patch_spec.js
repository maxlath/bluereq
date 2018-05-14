const should = require('should')
const bluereq = require('../../lib/bluereq')
// test server config
const port = 9090
const host = `http://localhost:${port}`
const server = require('../fixtures/server')

describe('patch request', () => {
  describe('without errors', () => {
    const validConfig = { url: `${host}/json`, json: { exampleParam: 'exampleValue' } }
    const expectedRes = { statusCode: 200, body: { message: 'PATCH complete.', req: validConfig.json } }

    before(() => server.start(port))
    after(() => server.stop())

    describe('#patch(url)', () => {
      it('triggers .then(res) function', done => {
        bluereq.patch(validConfig.url)
        .then(res => {
          should(res.statusCode).equal(expectedRes.statusCode)
          should(res.body.message).equal(expectedRes.body.message)
          should(res.body.req).deepEqual({})
          done()
        })
      })
    })

    describe('#patch(config)', () => {
      it('triggers .then(res) function', done => {
        bluereq.patch(validConfig)
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
    describe('#patch(url)', () => {
      it('triggers .catch(err) function', done => {
        bluereq.patch(invalidConfig.url)
        .catch(err => {
          should(err).be.ok()
          done()
        })
      })
    })

    describe('#patch(config)', () => {
      it('triggers .catch(res) function', done => {
        bluereq.patch(invalidConfig)
        .catch(err => {
          should(err).be.ok()
          done()
        })
      })
    })
  })
})
