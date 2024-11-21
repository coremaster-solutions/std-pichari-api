import swaggerJsDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Ferreteria API Documentación",
      version: "1.0.0",
    },
  },
  apis: [`${path.join(__dirname, "../routes/v1/*")}`],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
