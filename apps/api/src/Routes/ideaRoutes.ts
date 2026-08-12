import { Router } from "express";

import { requireAuth } from "../middleware/authMiddleware.js";
import {
  createIdea,
  deleteIdea,
  getIdea,
  getOverviewStats,
  listIdeas,
  reevaluateIdea,
} from "../Controllers/ideaController.js";

const router = Router();

router.use(requireAuth);

router.get("/overview-stats", getOverviewStats);
router.get("/", listIdeas);
router.post("/", createIdea);
router.get("/:id", getIdea);
router.post("/:id/reevaluate", reevaluateIdea);
router.delete("/:id", deleteIdea);

export default router;
