import { Router } from "express";
import { getActivity } from "../Controllers/dashboardController.js";
import {
  getAnalytics,
  getDebuggingAnalytics,
  getIdeaAnalytics,
} from "../Controllers/dashboardAnalyticsController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.use(requireAuth);

// GET /api/dashboard/activity?days=30&limit=30
router.get("/activity", getActivity);

// GET /api/dashboard/analytics?days=30&interval=day&projectId=
router.get("/analytics", getAnalytics);

// GET /api/dashboard/debugging?days=30&interval=day&projectId=
router.get("/debugging", getDebuggingAnalytics);

// GET /api/dashboard/ideas?days=30&interval=day&projectId=
router.get("/ideas", getIdeaAnalytics);

export default router;
