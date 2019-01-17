const should = require('should')
const getOpts = require('../../lib/get_options')

describe('argParser', () => {
  describe('getOpts', () => {
    describe('[url]', () => {
      it('should return a valid options object', () => {
        const args = ['http://example.dev']
        should(getOpts(args).config).deepEqual({ url: 'http://example.dev', json: true, gzip: true })
        should(getOpts(args).callback).not.be.ok()
      })
    })

    describe('[config]', () => {
      it('should return a valid options object', () => {
        const args = [{ url: 'http://example.dev' }]
        const opts = getOpts(args)
        should(opts.config).deepEqual(args[0])
        should(opts.callback).not.be.ok()
      })
    })

    describe('[url, data]', () => {
      const args = ['http://example.dev', { message: 'JSON data' }]
      it('should return a valid options object', () => {
        const opts = getOpts(args, true)
        should(opts.config).deepEqual({ url: args[0], json: args[1], gzip: true })
        should(opts.callback).not.be.ok()
      })
    })

    describe('[url, string data]', () => {
      const args = ['http://example.dev', 'string data']
      it('should return without json option', () => {
        const opts = getOpts(args, true)
        should(opts.config).deepEqual({ url: args[0], body: args[1], gzip: true })
      })
    })
  })
})
