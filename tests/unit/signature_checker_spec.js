const { expect } = require('chai')
const sig = require('../../lib/signature_checker')
const nullFn = () => null

describe('signatureChecker', () => {
  describe('#matches', () => {
    describe('a single arg signature', () => {
      describe('(number) signature', () => {
        it('returns true if the first arg is a number', () => {
          const args = [123]
          expect(sig.matches(args, 'number')).to.equal(true)
        })

        it('returns false if the first arg is not a number', () => {
          const args = ['123']
          expect(sig.matches(args, 'number')).to.equal(false)
        })
      })

      describe('(object) signature', () => {
        it('returns true if the first arg is a object', () => {
          const args = [{}]
          expect(sig.matches(args, 'object')).to.equal(true)
        })

        it('returns false if the first arg is not a object', () => {
          const args = ['']
          expect(sig.matches(args, 'object')).to.equal(false)
        })
      })
      describe('(string) signature', () => {
        it('returns true if the first arg is a string', () => {
          const args = ['123']
          expect(sig.matches(args, 'string')).to.equal(true)
        })

        it('returns false if the first arg is not a string', () => {
          const args = [123]
          expect(sig.matches(args, 'string')).to.equal(false)
        })

        describe('(function) signature', () => {
          it('returns true if the first arg is a function', () => {
            const args = [ () => {} ]
            expect(sig.matches(args, 'function')).to.equal(true)
          })

          it('returns false if the first arg is not a function', () => {
            const args = ['']
            expect(sig.matches(args, 'function')).to.equal(false)
          })
        })
      })

      describe('a multiple arg signature', () => {
        it('returns true if the arguments match the signature', () => {
          const args = ['123', {}, 123, nullFn]
          expect(sig.matches(args, 'string', 'object', 'number', 'function')).to.equal(true)
        })

        it('returns false if none of the arguments match the signature', () => {
          const args = ['123', {}, 123, nullFn]
          expect(sig.matches(args, 'object', 'number', 'function', 'string')).to.equal(false)
        })

        it('returns false if there are too few arguments', () => {
          const args = [1]
          expect(sig.matches(args, 'number', 'number')).to.equal(false)
        })

        it('returns false if there are too many arguments', () => {
          const args = [1, 2, 3]
          expect(sig.matches(args, 'number', 'number')).to.equal(false)
        })

        it("returns false if one or more argument doesn't match the signature", () => {
          const args = ['123', {}, 123, nullFn]
          expect(sig.matches(args, 'string', 'object', 'number', 'number')).to.equal(false)
          expect(sig.matches(args, 'string', 'number', 'number', 'number')).to.equal(false)
          expect(sig.matches(args, 'number', 'number', 'number', 'number')).to.equal(false)
        })
      })
    })
  })
})
