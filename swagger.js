const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Library API',
        description: 'Book API'
    },
    host: 'localhost:3000',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFile, doc);