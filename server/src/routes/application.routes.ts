import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createApplication,
  listApplications,
  updateApplicationStatus,
} from "../controllers/application.controller";

const router = express.Router();

router.post("/", authMiddleware(["tenant"]), createApplication);
router.post(
  "/:id/status",
  authMiddleware(["manager"]),
  updateApplicationStatus
);
router.post("/", authMiddleware(["tenant", "manager"]), listApplications);

export default router;
