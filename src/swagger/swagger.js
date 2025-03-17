import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swaggerDocs";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Aluguel de Cadeiras API",
      version: "1.0.0",
      description: "API para gerenciamento de aluguel de cadeiras",
    },
    servers: [
      {
        url: "http://localhost:3333",
      },
    ],
  },
  apis: ["./src/swagger/swaggerDocs.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export { swaggerSpec, swaggerUi };
