/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>
 --------------
 ******/

'use strict'

const Test = require('tapes')(require('tape'))
const Sinon = require('sinon')
const TransferCommands = require('../../../../../src/domain/transfer/commands')

Test('Eventric Transfer index test', indexTest => {
  let sandbox

  indexTest.beforeEach(t => {
    sandbox = Sinon.sandbox.create()
    t.end()
  })

  indexTest.afterEach(t => {
    sandbox.restore()
    t.end()
  })

  indexTest.test('publishPrepare should', prepareTest => {
    prepareTest.test('execute publishPrepare command on context', async t => {
      let command = sandbox.stub()
      let expected = true
      command.returns(expected)

      let payload = {
        transferId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        payeeFsp: '1234',
        payerFsp: '5678',
        amount: {
          currency: 'USD',
          amount: 123.45
        },
        ilpPacket: 'AYIBgQAAAAAAAASwNGxldmVsb25lLmRmc3AxLm1lci45T2RTOF81MDdqUUZERmZlakgyOVc4bXFmNEpLMHlGTFGCAUBQU0svMS4wCk5vbmNlOiB1SXlweUYzY3pYSXBFdzVVc05TYWh3CkVuY3J5cHRpb246IG5vbmUKUGF5bWVudC1JZDogMTMyMzZhM2ItOGZhOC00MTYzLTg0NDctNGMzZWQzZGE5OGE3CgpDb250ZW50LUxlbmd0aDogMTM1CkNvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbgpTZW5kZXItSWRlbnRpZmllcjogOTI4MDYzOTEKCiJ7XCJmZWVcIjowLFwidHJhbnNmZXJDb2RlXCI6XCJpbnZvaWNlXCIsXCJkZWJpdE5hbWVcIjpcImFsaWNlIGNvb3BlclwiLFwiY3JlZGl0TmFtZVwiOlwibWVyIGNoYW50XCIsXCJkZWJpdElkZW50aWZpZXJcIjpcIjkyODA2MzkxXCJ9IgA',
        condition: 'q8q-v7RAbJTLf3DsetPTEOLBLUxtMe3c',
        expiration: '2016-05-24T08:38:08.699-04:00',

        extensionList:
        {
          extension:
          [
            {
              key: 'errorDescription',
              value: 'This is a more detailed error description'
            },
            {
              key: 'errorDescription',
              value: 'This is a more detailed error description'
            }
          ]
        }
      }

      TransferCommands.publishPrepare(payload)
        .then(tfr => {
          t.equal(tfr, expected)
          t.end()
        })
    })

    // prepareTest.test('throws error if could not send message to kafka', async t => {
    //   let command = sandbox.stub()
    //   const error = new Error()
    //   command.returns(P.reject(error))
    //   let payload = {
    //     transferId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
    //     payeeFsp: '1234',
    //     payerFsp: '5678',
    //     amount: {
    //       currency: 'USD',
    //       amount: 123.45
    //     },
    //     ilpPacket: 'AYIBgQAAAAAAAASwNGxldmVsb25lLmRmc3AxLm1lci45T2RTOF81MDdqUUZERmZlakgyOVc4bXFmNEpLMHlGTFGCAUBQU0svMS4wCk5vbmNlOiB1SXlweUYzY3pYSXBFdzVVc05TYWh3CkVuY3J5cHRpb246IG5vbmUKUGF5bWVudC1JZDogMTMyMzZhM2ItOGZhOC00MTYzLTg0NDctNGMzZWQzZGE5OGE3CgpDb250ZW50LUxlbmd0aDogMTM1CkNvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbgpTZW5kZXItSWRlbnRpZmllcjogOTI4MDYzOTEKCiJ7XCJmZWVcIjowLFwidHJhbnNmZXJDb2RlXCI6XCJpbnZvaWNlXCIsXCJkZWJpdE5hbWVcIjpcImFsaWNlIGNvb3BlclwiLFwiY3JlZGl0TmFtZVwiOlwibWVyIGNoYW50XCIsXCJkZWJpdElkZW50aWZpZXJcIjpcIjkyODA2MzkxXCJ9IgA',
    //     condition: 'q8q-v7RAbJTLf3DsetPTEOLBLUxtMe3c',
    //     expiration: '2016-05-24T08:38:08.699-04:00',

    //     extensionList:
    //       {
    //         extension:
    //           [
    //             {
    //               key: 'errorDescription',
    //               value: 'This is a more detailed error description'
    //             },
    //             {
    //               key: 'errorDescription',
    //               value: 'This is a more detailed error description'
    //             }
    //           ]
    //       }
    //   }

    //   try {
    //     await TransferCommands.publishPrepare(payload)
    //   } catch (e) {
    //     test.ok(e instanceof Error)
    //     test.equal(e.message, 'An error has occurred')
    //     test.end()
    //   }
    // })

    prepareTest.end()
  })
  indexTest.end()
})
