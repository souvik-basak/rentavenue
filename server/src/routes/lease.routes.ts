import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getLeases, getLeasesPayments } from "../controllers/lease.controller";


const router = express.Router();

router.get("/", authMiddleware(["manager", "tenant"]),getLeases);
router.get("/:id/payments", authMiddleware(["manager", "tenant"]),getLeasesPayments);

export default router;
