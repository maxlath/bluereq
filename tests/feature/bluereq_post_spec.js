const should = require('should')
const bluereq = require('../../lib/bluereq')
// test server config
const port = 9090
const host = `http://localhost:${port}`
const server = require('../fixtures/server')

describe('post request', () => {
  describe('without errors', () => {
    const validConfig = { url: `${host}/json`, json: { exampleParam: 'exampleValue' } }
    const expectedRes = { statusCode: 200, body: { message: 'POST complete.', req: validConfig.json } }

    before(() => server.start(port))
    after(() => server.stop())

    describe('#post(url)', () => {
      it('triggers .then(res) function', done => {
        bluereq.post(validConfig.url)
        .then(res => {
          should(res.statusCode).equal(expectedRes.statusCode)
          should(res.body.message).equal(expectedRes.body.message)
          should(res.body.req).deepEqual({})
          done()
        })
      })
    })

    describe('#post(url, text)', () => {
      it('triggers .then(res) function', done => {
        bluereq.post(validConfig.url, 'some text')
        .then(res => {
          should(res.statusCode).equal(expectedRes.statusCode)
          should(typeof res.body === 'string').be.true()
          const body = JSON.parse(res.body)
          should(body.message).equal(expectedRes.body.message)
          done()
        })
      })
    })

    describe('#post(config)', () => {
      it('triggers .then(res) function', done => {
        bluereq.post(validConfig)
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

    before(() => server.start(port))
    after(() => server.stop())

    describe('#post(url)', () => {
      it('triggers .catch(err) function', done => {
        bluereq.post(invalidConfig.url)
        .catch(err => {
          should(err).be.ok()
          done()
        })
      })

      it('returns formatted server errors', done => {
        bluereq.post(`${host}/undefined-endpoint`)
        .catch(err => {
          should(err).be.ok()
          should(err.statusCode).equal(404)
          should(err.statusMessage).equal('Not Found')
          should(err.headers).be.ok()
          should(err.body).be.ok()
          should(err.url).equal(`${host}/undefined-endpoint`)
          done()
        })
      })
    })

    describe('#post(config)', () => {
      it('triggers .catch(res) function', done => {
        bluereq.post(invalidConfig)
        .catch(err => {
          should(err).be.ok()
          done()
        })
      })
    })
  })
})
