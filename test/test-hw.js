const request = require('request-promise-native'),
    expect = require('chai').expect,
    port = process.env.PORT || 8080;


describe('Service end-to-end tests', () => {

    it('Request "Harry Potter" films', async () => {
        const body = await request.get(`http://localhost:${port}/films/harry_potter`),
            films = JSON.parse(body);

        expect(films).to.have.length(8);
    });


});