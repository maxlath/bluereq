expect = require("chai").expect
bluereq = require "../../src/bluereq"
# test server config
port = 9090
host = "http://localhost:#{port}"
server = require "../fixtures/server"

describe "bluereq", ->

  describe "put request", ->

    describe "without errors", ->

      validConfig = { url: "#{host}/json", json: { exampleParam: "exampleValue" } }
      expectedRes = { statusCode: 200, body: { message: "PUT complete.", req: validConfig.json }}

      before -> server.start(port)
      after -> server.stop()

      describe "#put(url)", ->

        it "triggers .then(res) function", (done) ->

          bluereq.put(validConfig.url).then (res) ->
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body.message).to.equal expectedRes.body.message
            expect(res.body.req).to.deep.equal {}
            done()

      describe "#put(config)", ->

        it "triggers .then(res) function", (done) ->

          bluereq.put(validConfig).then (res) ->
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()

      describe "#put(url, callback)", ->

        it "triggers callback function with signature (null, res)", (done) ->
          bluereq.put validConfig.url, (err, res) ->
            expect(err).to.not.exist
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body.message).to.equal expectedRes.body.message
            expect(res.body.req).to.deep.equal {}
            done()

      describe "#put(config, callback)", ->

        it "triggers callback function with signature (null, res)", (done) ->
          bluereq.put validConfig, (err, res) ->
            expect(err).to.not.exist
            expect(res.statusCode).to.deep.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()

    describe "with errors", ->

      invalidConfig = { url: "" }

      describe "#put(url)", ->

        it "triggers .fail(err) function", (done) ->

          bluereq.put(invalidConfig.url).fail (err) ->
            expect(err).to.exist
            done()

      describe "#put(config)", ->

        it "triggers .fail(res) function", (done) ->

          bluereq.put(invalidConfig).fail (err) ->
            expect(err).to.exist
            done()

      describe "#put(url, callback)", ->

        it "triggers callback function with signature (err, null)", (done) ->
          bluereq.put invalidConfig.url, (err, res) ->
            expect(err).to.exist
            expect(res).to.not.exist
            done()

      describe "#put(config, callback)", ->

        it "triggers callback function with signature (err, null)", (done) ->
          bluereq.put invalidConfig, (err, res) ->
            expect(err).to.exist
            expect(res).to.not.exist
            done()
