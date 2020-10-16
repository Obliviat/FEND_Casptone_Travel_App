const request = require('supertest');
import '@babel/polyfill';
const app = require('../server/index.js');

describe('Test root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});

describe('Text path "/forecast"', () => {
    test('It should response the POST method', async () => {
        const response = await request(app).post('/forecast');
        expect(response.statusCode).toBe(200);
    });
});

describe('Text path "/save"', () => {
    test('It should response the Get method', async () => {
        const response = await request(app).get('/save');
        expect(response.statusCode).toBe(200);
    });
});