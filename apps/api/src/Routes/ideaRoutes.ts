import { Router } from "express";
import { getAllOverviewStats } from "../Controllers/ideaController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

/**
 * Workspace-wide idea routes — NOT project-scoped.
 * Mounted at /api/ideas in app.ts.
 *
 * Project-scoped idea CRUD continues to live under
 * /api/projects/:projectId/ideas/... via projectScopedRoutes.ts —
 * this router only adds the aggregate stats used by the global
 * Dashboard's Idea Validator summary.
 */
const router = Router();

router.use(requireAuth);

// GET /api/ideas/overview-stats?days=30
router.get("/overview-stats", getAllOverviewStats);

export default router;
