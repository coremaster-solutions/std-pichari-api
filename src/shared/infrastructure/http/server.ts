import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { TPrismaService, prismaService } from "../db";

import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./middleware/swagger";
import { Server as ServerHttp, createServer } from "node:http";

import session from "express-session";
import { Envs } from "@/shared/config";
import { jobsProvider, redisProvider } from "../containers";
import { AppError } from "@/shared/domain/models";
import RedisStore from "connect-redis";

export const optionsCorsGlobal = {
  origin: [
    "*",
    "http://localhost:3000",
    "https://www.coremaster.dev",
    "https://coremaster.dev",
    "https://std-pichari.coremaster.dev",
    "https://max-demo.site",
    "https://wwww.max-demo.site",
  ],
  credentials: true,
};
declare module "express-session" {
  interface SessionData {
    count: number;
  }
}

const redisStore = new RedisStore({
  client: redisProvider.client,
  disableTouch: true,
});
const sessionMiddleware = session({
  store: redisStore,
  secret: Envs.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
});

export class Server {
  private app: express.Express;
  private http: ServerHttp;
  private port: number;
  private db: TPrismaService;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT || 4000);
    this.db = prismaService;
    this.dbConnect();
    this.http = createServer(this.app);
    this.registerMiddlewares();
    this.registerRoutes();

    this.app.use(
      (error: Error, request: Request, response: Response, _: NextFunction) => {
        console.log(error instanceof AppError, "Server");

        if (error instanceof AppError) {
          const payloadError = {
            message: error.message,
            data: [],
          };

          if (error.status_code) {
            Object.assign(payloadError, { code: error.code });
          }

          if (Boolean(error.data)) {
            Object.assign(payloadError, { data: error.data });
          }

          return response.status(error.status_code).json(payloadError);
        }
        console.log("error handle", error);

        return response.status(500).json({
          message: "Internal Server Error",
          code: "99999",
        });
        // response.status(request.statusCode || 500);
        // response.json({
        //   message: error.message,
        // });
      }
    );
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404);
      const error = new Error("Not Found");
      next(error);
    });
  }

  get HttpServer() {
    return this.http;
  }

  registerMiddlewares() {
    this.app.use(express.json());
    this.app.use(
      cors({
        allowedHeaders: ["Content-Type", "Authorization"],
        ...optionsCorsGlobal,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        preflightContinue: false,
        optionsSuccessStatus: 204,
      })
    );
    this.app.use(sessionMiddleware);
    this.app.options("*", cors());
    this.app.use(helmet());
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  }

  registerRoutes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({ status: "ok" });
    });
    this.app.use(routes);
    this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    this.app.use("/uploads", express.static("uploads"));
    this.app.use("/tmp", express.static("tmp"));
    this.app.use("/public", express.static("public"));
    this.app.use("/admin/queues", jobsProvider.adapterRoute());
  }

  async dbConnect() {
    try {
      console.log("Connect to database");
    } catch (error) {
      console.log("Error connect to database");
    } finally {
      await this.db.$disconnect();
    }
  }

  async socketConnect() {}

  listen() {
    this.http.listen(this.port, () => {
      console.log(
        `[server]: Server is running at http://localhost:${this.port}`
      );
    });
    // this.app.listen(this.port, () => {
    //   console.log(
    //     `[server]: Server is running at http://localhost:${this.port}`
    //   );
    // });
  }
}
