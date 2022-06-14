import createServer from 'server'
import request from 'supertest'
const app = createServer();

describe('auth route', () => {
  it("/auth responds with 200", (done) => {
    request(app).get('/auth').expect(200, done)
  })
})