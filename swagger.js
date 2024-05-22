const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SMERPGo Push Notifications API',
      version: '1.0.0',
      description: 'API to send push notifications to Android and iOS devices',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./index.js'], // Make sure this path is correct
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
