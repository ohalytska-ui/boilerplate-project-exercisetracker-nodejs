import app from '../index.js';
import request from 'supertest';
import { user } from '../mock/user.js';
import { expect } from 'chai';

//mocha & chai
describe("test users endpoints",()=>{
    it("test get all users", async () => {
        const res = await request(app).get('/api/users');
        expect(res.status).to.equal(200);
    });

    it("test add user", async () => {
        const res = await request(app).post('/api/users').send(user);
        expect(res.status).to.equal(200);
    }); 
});
