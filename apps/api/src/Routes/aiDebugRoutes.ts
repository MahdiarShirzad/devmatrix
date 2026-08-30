import { Router } from "express";
import { listAllSessions } from "../Controllers/aiDebugController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

/**
 * Workspace-wide AI debugging routes — NOT project-scoped.
 * Mounted at /api/ai-debug in app.ts.
 *
 * Project-scoped session CRUD (create/get/reanalyze/delete) continues
 * to live under /api/projects/:projectId/ai-debug/... via
 * projectScopedRoutes.ts — this router only adds the aggregate list
 * used by the global Dashboard.
 */
const router = Router();

router.use(requireAuth);

// GET /api/ai-debug/sessions?days=30
router.get("/sessions", listAllSessions);

export default router;
