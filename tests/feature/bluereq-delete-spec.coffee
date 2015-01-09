expect = require("chai").expect
bluereq = require "../../src/bluereq"
# test server config
port = 9090
host = "http://localhost:#{port}"
server = require "../fixtures/server"

describe "bluereq", ->

  describe "delete request", ->

    describe "without errors", ->

      expectedRes = { statusCode: 200, body: { message: "DELETE complete." }}
      validConfig = { url: "#{host}/json", json: true }

      before -> server.start(port)
      after -> server.stop()

      describe "#delete(url)", ->

        it "triggers .then(res) function", (done) ->

          bluereq.delete(validConfig.url).then (res) ->
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()

      describe "#delete(config)", ->

        it "triggers .then(res) function", (done) ->

          bluereq.delete(validConfig).then (res) ->
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()

      describe "#delete(url, callback)", ->

        it "triggers callback function with signature (null, res)", (done) ->
          bluereq.delete validConfig.url, (err, res) ->
            expect(err).to.not.exist
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()

      describe "#delete(config, callback)", ->

        it "triggers callback function with signature (null, res)", (done) ->
          bluereq.delete validConfig, (err, res) ->
            expect(err).to.not.exist
            expect(res.statusCode).to.deep.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()


    describe "with errors", ->

      invalidConfig = { url: "" }

      describe "#delete(url)", ->

        it "triggers .fail(err) function", (done) ->

          bluereq.delete(invalidConfig.url).fail (err) ->
            expect(err).to.exist
            done()

      describe "#delete(config)", ->

        it "triggers .fail(res) function", (done) ->

          bluereq.delete(invalidConfig).fail (err) ->
            expect(err).to.exist
            done()

      describe "#delete(url, callback)", ->

        it "triggers callback function with signature (err, null)", (done) ->
          bluereq.delete invalidConfig.url, (err, res) ->
            expect(err).to.exist
            expect(res).to.not.exist
            done()

      describe "#delete(config, callback)", ->

        it "triggers callback function with signature (err, null)", (done) ->
          bluereq.delete invalidConfig, (err, res) ->
            expect(err).to.exist
            expect(res).to.not.exist
            done()
