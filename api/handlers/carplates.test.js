
const axios = require('axios');

describe('get@api/carplates', () => {
    it('should create and return an carplate with a status of 200', async() => {
        const result = await axios.get(
            'http://localhost:8081/api/carplates'
        );
        expect(results.status).toEqual(200);
    });
});

