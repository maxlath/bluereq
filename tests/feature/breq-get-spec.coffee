expect = require("chai").expect
breq = require "../../src/breq"
# test server config
port = 9090
host = "http://localhost:#{port}"
server = require "../fixtures/server"

describe "breq", ->

  describe "get request", ->

    describe "without errors", ->

      expectedRes = { statusCode: 200, body: { message: "GET complete." }}
      validConfig = { url: "#{host}/json", json: true }

      before -> server.start(port)
      after -> server.stop()

      describe "#get(url)", ->

        it "triggers .then(res) function", (done) ->

          breq.get(validConfig.url).then (res) ->
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()

      describe "#get(config)", ->

        it "triggers .then(res) function", (done) ->

          breq.get(validConfig).then (res) ->
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()

      describe "#get(url, callback)", ->

        it "triggers callback function with signature (null, res)", (done) ->
          breq.get validConfig.url, (err, res) ->
            expect(err).to.not.exist
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()

      describe "#get(config, callback)", ->

        it "triggers callback function with signature (null, res)", (done) ->
          breq.get validConfig, (err, res) ->
            expect(err).to.not.exist
            expect(res.statusCode).to.deep.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()


    describe "with errors", ->

      invalidConfig = { url: "" }

      describe "#get(url)", ->

        it "triggers .fail(err) function", (done) ->

          breq.get(invalidConfig.url).fail (err) ->
            expect(err).to.exist
            done()

      describe "#get(config)", ->

        it "triggers .fail(res) function", (done) ->

          breq.get(invalidConfig).fail (err) ->
            expect(err).to.exist
            done()

      describe "#get(url, callback)", ->

        it "triggers callback function with signature (err, null)", (done) ->
          breq.get invalidConfig.url, (err, res) ->
            expect(err).to.exist
            expect(res).to.not.exist
            done()

      describe "#get(config, callback)", ->

        it "triggers callback function with signature (err, null)", (done) ->
          breq.get invalidConfig, (err, res) ->
            expect(err).to.exist
            expect(res).to.not.exist
            done()
