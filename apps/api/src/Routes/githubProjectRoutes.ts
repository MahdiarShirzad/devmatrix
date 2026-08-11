import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  getAvailableRepos,
  listProjects,
  linkProject,
  getProject,
  syncProject,
  unlinkProject,
  getProjectStats,
  getOverviewStats,
  setAccessToken,
  removeAccessToken,
} from "../Controllers/githubProjectController.js";

const router = Router();

router.use(requireAuth);

router.get("/available-repos", getAvailableRepos);
router.get("/overview-stats", getOverviewStats);

router.patch("/access-token", setAccessToken);
router.delete("/access-token", removeAccessToken);

router.get("/", listProjects);
router.post("/", linkProject);

router.get("/:id", getProject);
router.delete("/:id", unlinkProject);

router.post("/:id/sync", syncProject);
router.get("/:id/stats", getProjectStats);

export default router;
