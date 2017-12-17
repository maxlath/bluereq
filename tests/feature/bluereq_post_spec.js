const { expect } = require('chai')
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
          expect(res.statusCode).to.equal(expectedRes.statusCode)
          expect(res.body.message).to.equal(expectedRes.body.message)
          expect(res.body.req).to.deep.equal({})
          done()
        })
      })
    })

    describe('#post(url, text)', () => {
      it('triggers .then(res) function', done => {
        bluereq.post(validConfig.url, 'some text')
        .then(res => {
          expect(res.statusCode).to.equal(expectedRes.statusCode)
          expect(typeof res.body === 'string').to.be.a.true()
          const body = JSON.parse(res.body)
          expect(body.message).to.equal(expectedRes.body.message)
          done()
        })
      })
    })

    describe('#post(config)', () => {
      it('triggers .then(res) function', done => {
        bluereq.post(validConfig)
        .then(res => {
          expect(res.statusCode).to.equal(expectedRes.statusCode)
          expect(res.body).to.deep.equal(expectedRes.body)
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
          expect(err).to.exist()
          done()
        })
      })

      it('returns formatted server errors', done => {
        bluereq.post(`${host}/undefined-endpoint`)
        .catch(err => {
          expect(err).to.exist()
          expect(err.statusCode).to.equal(404)
          expect(err.statusMessage).to.equal('Not Found')
          expect(err.headers).to.exist()
          expect(err.body).to.exist()
          expect(err.url).to.equal(`${host}/undefined-endpoint`)
          done()
        })
      })
    })

    describe('#post(config)', () => {
      it('triggers .catch(res) function', done => {
        bluereq.post(invalidConfig)
        .catch(err => {
          expect(err).to.exist()
          done()
        })
      })
    })
  })
})
