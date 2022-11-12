const app = require('../index');
const request = require('supertest');
const { user } = require('../mock/user');

//jest
describe("test users endpoints",()=>{
    test("test get all users", async () => {
        const res = await request(app).get('/api/users');
        expect(res.status).toBe(200);
    });

    test("test add user", async () => {
        const res = await request(app).post('/api/users').send(user);
        expect(res.status).toBe(200);
    }); 
});
