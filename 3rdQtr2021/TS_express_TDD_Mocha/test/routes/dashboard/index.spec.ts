import createServer from 'server'
import request from 'supertest'
const app = createServer();

describe('dashboard route', () => {
  it("/dashboard responds with 200", (done) => {
    request(app).get('/dashboard').expect(200, done)
  })
})