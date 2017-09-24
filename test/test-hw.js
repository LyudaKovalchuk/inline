const request = require('request-promise-native'),
    chai = require('chai'),
    port = process.env.PORT || 8080;

chai.should();

describe('Simple test on hw endpoint', () => {

    it('No hello world page', async () => {
        const response = await request.get(`http://localhost:${port}/ninja`);
        response.should.not.equal('Hello world');
    });

    it('Hello world page', async () => {
        const response = await request.get(`http://localhost:${port}`);
        response.should.equal('Hello world');
    });

    it('Hello world letter count', async () => {
        const response = await request.get(`http://localhost:${port}`);
        response.should.have.lengthOf('Hello world'.length);
    });
});

