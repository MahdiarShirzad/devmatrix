import { Router } from "express";
import {
  createSession,
  listSessions,
  getSession,
  reanalyzeSession,
  deleteSession,
} from "../Controllers/aiDebugController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.use(requireAuth);

router.post("/sessions", createSession);
router.get("/sessions", listSessions);
router.get("/sessions/:id", getSession);
router.post("/sessions/:id/reanalyze", reanalyzeSession);
router.delete("/sessions/:id", deleteSession);

export default router;
