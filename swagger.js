const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Library API',
        description: 'Library Management API'
    },
    // host: 'cse341-team-fclq.onrender.com',
    host: 'localhost:3000',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];
const endpointsFiles = ['./routes/index.js', './routes/staffRoute.js'];

swaggerAutogen(outputFile, endpointsFile, doc);