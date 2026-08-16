import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";

import {
  createIdea,
  deleteIdea,
  getIdea,
  getOverviewStats as getIdeasOverviewStats,
  listIdeas,
  reevaluateIdea,
} from "../Controllers/ideaController.js";

import {
  createSession,
  deleteSession,
  getSession,
  listSessions,
  reanalyzeSession,
} from "../Controllers/aiDebugController.js";

import {
  createCollection,
  createRequest,
  deleteCollection,
  deleteRequest,
  executeRequest,
  getCollection,
  getCollections,
  updateRequest,
} from "../Controllers/playgroundController.js";

// mergeParams so nested routers can read :projectId from the parent mount
const router = Router({ mergeParams: true });

router.use(requireAuth);

// ---- Ideas ----
router.get("/ideas/overview-stats", getIdeasOverviewStats);
router.get("/ideas", listIdeas);
router.post("/ideas", createIdea);
router.get("/ideas/:id", getIdea);
router.post("/ideas/:id/reevaluate", reevaluateIdea);
router.delete("/ideas/:id", deleteIdea);

// ---- AI Debugging ----
router.get("/ai-debug/sessions", listSessions);
router.post("/ai-debug/sessions", createSession);
router.get("/ai-debug/sessions/:id", getSession);
router.post("/ai-debug/sessions/:id/reanalyze", reanalyzeSession);
router.delete("/ai-debug/sessions/:id", deleteSession);

// ---- API Playground ----
router.get("/playground/collections", getCollections);
router.post("/playground/collections", createCollection);
router.get("/playground/collections/:id", getCollection);
router.delete("/playground/collections/:id", deleteCollection);
router.post("/playground/collections/:id/requests", createRequest);
router.patch("/playground/requests/:id", updateRequest);
router.delete("/playground/requests/:id", deleteRequest);
router.post("/playground/execute", executeRequest);

export default router;
