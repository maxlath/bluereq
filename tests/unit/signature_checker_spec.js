const should = require('should')
const sig = require('../../lib/signature_checker')
const nullFn = () => null

describe('signatureChecker', () => {
  describe('#matches', () => {
    describe('a single arg signature', () => {
      describe('(number) signature', () => {
        it('returns true if the first arg is a number', () => {
          const args = [123]
          should(sig.matches(args, 'number')).equal(true)
        })

        it('returns false if the first arg is not a number', () => {
          const args = ['123']
          should(sig.matches(args, 'number')).equal(false)
        })
      })

      describe('(object) signature', () => {
        it('returns true if the first arg is a object', () => {
          const args = [{}]
          should(sig.matches(args, 'object')).equal(true)
        })

        it('returns false if the first arg is not a object', () => {
          const args = ['']
          should(sig.matches(args, 'object')).equal(false)
        })
      })
      describe('(string) signature', () => {
        it('returns true if the first arg is a string', () => {
          const args = ['123']
          should(sig.matches(args, 'string')).equal(true)
        })

        it('returns false if the first arg is not a string', () => {
          const args = [123]
          should(sig.matches(args, 'string')).equal(false)
        })

        describe('(function) signature', () => {
          it('returns true if the first arg is a function', () => {
            const args = [ () => {} ]
            should(sig.matches(args, 'function')).equal(true)
          })

          it('returns false if the first arg is not a function', () => {
            const args = ['']
            should(sig.matches(args, 'function')).equal(false)
          })
        })
      })

      describe('a multiple arg signature', () => {
        it('returns true if the arguments match the signature', () => {
          const args = ['123', {}, 123, nullFn]
          should(sig.matches(args, 'string', 'object', 'number', 'function')).equal(true)
        })

        it('returns false if none of the arguments match the signature', () => {
          const args = ['123', {}, 123, nullFn]
          should(sig.matches(args, 'object', 'number', 'function', 'string')).equal(false)
        })

        it('returns false if there are too few arguments', () => {
          const args = [1]
          should(sig.matches(args, 'number', 'number')).equal(false)
        })

        it('returns false if there are too many arguments', () => {
          const args = [1, 2, 3]
          should(sig.matches(args, 'number', 'number')).equal(false)
        })

        it("returns false if one or more argument doesn't match the signature", () => {
          const args = ['123', {}, 123, nullFn]
          should(sig.matches(args, 'string', 'object', 'number', 'number')).equal(false)
          should(sig.matches(args, 'string', 'number', 'number', 'number')).equal(false)
          should(sig.matches(args, 'number', 'number', 'number', 'number')).equal(false)
        })
      })
    })
  })
})
