import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "YouTube Clone API",
      version: "1.0.0",
    },
  },
 apis: ["./src/**/*.js"],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };