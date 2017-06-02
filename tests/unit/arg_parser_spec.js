const { expect } = require('chai')
const getOpts = require('../../lib/get_options')

describe('argParser', () => {
  describe('getOpts', () => {
    describe('[url]', () => {
      it('returns a valid options object', () => {
        const args = ['http://example.dev']
        expect(getOpts(args).config).to.deep.equal({ url: 'http://example.dev', json: true })
        expect(getOpts(args).callback).to.not.exist
      })
    })

    describe('[config]', () => {
      it('returns a valid options object', () => {
        const args = [{ url: 'http://example.dev' }]
        const opts = getOpts(args)
        expect(opts.config).to.deep.equal(args[0])
        expect(opts.callback).to.not.exist
      })
    })

    describe('[url, data]', () => {
      const args = ['http://example.dev', { message: 'JSON data' }]
      describe('if "hasData" is true', () => {
        it('returns a valid options object', () => {
          const opts = getOpts(args, true)
          expect(opts.config).to.deep.equal({ url: args[0], json: args[1] })
          expect(opts.callback).to.not.exist
        })
      })
    })
  })
})
