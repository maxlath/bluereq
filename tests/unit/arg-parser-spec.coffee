expect = require('chai').expect
argParser = require '../../src/arg-parser'
nullCb = (err, res) -> null

describe 'argParser', ->

  describe 'getOpts', ->

    describe '[url]', ->

      it 'returns a valid options object', ->
        args = ['http://example.dev']
        expect(argParser.getOpts(args).config).to.deep.equal { url: 'http://example.dev', json: true }
        expect(argParser.getOpts(args).callback).to.not.exist

    describe '[config]', ->

      it 'returns a valid options object', ->
        args = [{ url: 'http://example.dev' }]
        opts = argParser.getOpts(args)
        expect(opts.config).to.deep.equal args[0]
        expect(opts.callback).to.not.exist

      describe 'if hasData is false', ->

        it 'throws an error', ->
          expect(-> argParser.getOpts(args, false)).to.throw Error

    describe '[url, data]', ->

      args = ['http://example.dev', { message: 'JSON data' }]

      describe 'if "hasData" is true', ->

        it 'returns a valid options object', ->
          opts = argParser.getOpts(args, true)
          expect(opts.config).to.deep.equal { url: args[0], json: args[1] }
          expect(opts.callback).to.not.exist

      describe 'if hasData is false', ->

        it 'throws an error', ->
          expect(-> argParser.getOpts(args, false)).to.throw Error
