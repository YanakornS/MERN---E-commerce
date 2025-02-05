const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0", // by default: '1.0.0'
    title: "SE Shop REST API", // by default: 'REST API'
    description: "RESTful API for SE Shop", // by default: '',
    contact: {
      name: "YanakornS",
      url: "https://pws.npru.ac.th/Yanakorn",
      email: "654259002@webmail.npru.ac.th",
    },
  },
  servers: [
    {
      url: "http://localhost:5000", // by default: 'http://localhost:3000'
      description: "Local", // by default: ''
    },
    {
      url: "http://render.com:5000", // by default: 'http://localhost:3000'
      description: "Online", // by default: ''
    },
    // { ... }
  ],
  tags: [
    // by default: empty Array
    {
      name: "Product", // Tag name
      description: "API For Product Object", // Tag description
    },
    // { ... }
  ],
  components: {
    schemas: {
      Product: {
        type: "object",
        properties: {
          name: { type: "string" },
          category: { type: "string" },
          description: { type: "string" },
          image: { type: "string" },
          price: { type: "number" },
        },
      },
      NewProduct: {
        name: "Mechanical Keyboard",
        description: "A mechanical keyboard with RGB lighting",
        price: 100,
        category: "gadget",
      },
      ProductResponse: {
        name: "Mechanical Keyboard",
        description: "A mechanical keyboard with RGB lighting",
        image:
          "https://firebasestorage.googleapis.com/v0/b/component-431e1.firebasestorage.app/o/se-shop%2Fupload%2F71fRP7KY9hL._AC_SL1500_.jpg?alt=media&token=f63134ce-67a9-4dda-af12-c6d54b70fdc3",
        price: 100,
        category: "gadget",
      },
    },
  }, // by default: empty object
};

const outputFile = "./docs/swagger-output.json";
const routes = ["./index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
