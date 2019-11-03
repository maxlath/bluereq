const should = require('should')
const getOptions = require('../../lib/get_options')

describe('argParser', () => {
  describe('getOptions', () => {
    describe('[url]', () => {
      it('should return a valid options object', () => {
        const args = ['http://example.dev']
        should(getOptions(args)).deepEqual({ url: 'http://example.dev', json: true, gzip: true })
      })
    })

    describe('[config]', () => {
      it('should return a valid options object', () => {
        const args = [{ url: 'http://example.dev' }]
        const options = getOptions(args)
        should(options).deepEqual(args[0])
      })
    })

    describe('[url, data]', () => {
      const args = ['http://example.dev', { message: 'JSON data' }]
      it('should return a valid options object', () => {
        const options = getOptions(args, true)
        should(options).deepEqual({ url: args[0], json: args[1], gzip: true })
      })
    })

    describe('[url, string data]', () => {
      const args = ['http://example.dev', 'string data']
      it('should return without json option', () => {
        const options = getOptions(args, true)
        should(options).deepEqual({ url: args[0], body: args[1], gzip: true })
      })
    })
  })
})
