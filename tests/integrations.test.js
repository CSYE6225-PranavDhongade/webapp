const request = require('supertest');
const { app, runMigrations } = require('../index.js');

beforeAll(async () => {
    await runMigrations();
});

function encodeCredentials(username, password) {
    const credentials = `${username}:${password}`;
    return Buffer.from(credentials).toString('base64');
}

it('should create an account', async () => {
    const res = await request(app)
        .post('/users')
        .send({
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            password: 'hellokitty'
        })
        .expect(200);

    res.body.should.have.property('first_name', 'John');
    res.body.should.have.property('last_name', 'Doe');
    res.body.should.have.property('email', 'john@example.com');
    res.body.should.have.property('account_created');
    res.body.should.not.have.property('password');

    userId = res.body.id;
});

const encodedCredentials = encodeCredentials('john@example.com', 'hellokitty');

it('should validate account existence using GET call', async () => {
    const req = {
        headers: {
            authorization: `Basic ${encodedCredentials}`
        }
    };

    const res = await request(app)
        .get('/users')
        .set(req.headers)
        .expect(200);

    res.body.should.have.property('first_name', 'John');
    res.body.should.have.property('last_name', 'Doe');
    res.body.should.have.property('email', 'john@example.com');
    res.body.should.have.property('account_created');
    res.body.should.have.property('account_updated');
    res.body.should.not.have.property('password');
});

describe('Integration test for creating an account and validating existence', () => {

    let userId;

    it('should create an account', async () => {
        const req = {
            headers: {
                authorization: `Basic ${encodedCredentials}`
            }
        };

        const res = await request(app)
            .put('/users')
            .send({
                first_name: 'Don',
                last_name: 'Peters',
            })
            .set(req.headers)
            .expect(200);

        userId = res.body.id;
    });

    const encodedCredentials = encodeCredentials('john@example.com', 'hellokitty');

    it('Update the account and using the Post call, validate the account was updated', async () => {

        const req = {
            headers: {
                authorization: `Basic ${encodedCredentials}`
            }
        };

        const res = await request(app)
            .get('/users')
            .set(req.headers)
            .expect(200);

        res.body.should.have.property('first_name', 'Don');
        res.body.should.have.property('last_name', 'Peters');
        res.body.should.have.property('email', 'john@example.com');
        res.body.should.have.property('account_created');
        res.body.should.have.property('account_updated');
        res.body.should.not.have.property('password');
    });
});