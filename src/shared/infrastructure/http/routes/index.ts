import { Router } from "express";
import { V1Routes } from "./v1";

const routesV1 = new V1Routes().registerRoutes();

const router = Router();

router.use("/v1", routesV1);

export default router;
