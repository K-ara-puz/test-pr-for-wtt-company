const request = require('supertest');
const app = require('../config');

describe('', function() {
    it('res with 200', function() {
      request(app)
        .get('http://localhost:3000/api/users')
        .set('Accept', 'application/json')
        .expect(200);
    });
    it('res with userTests Array', async function() {
        await request(app)
        .post('http://localhost:3000/api/users/login')
        .set('Accept', 'application/json')
        .send({login: "user1", password: "Wsxc1290fdf"})
        .expect(String);
    });
});