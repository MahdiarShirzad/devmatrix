import { Router } from "express";
import { getActivity } from "../Controllers/dashboardController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.use(requireAuth);

// GET /api/dashboard/activity?days=30&limit=30
router.get("/activity", getActivity);

export default router;
