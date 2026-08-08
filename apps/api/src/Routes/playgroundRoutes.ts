import express from "express";
import {
  createCollection,
  getCollections,
  getCollection,
  deleteCollection,
  createRequest,
  updateRequest,
  deleteRequest,
  executeRequest,
} from "../Controllers/playgroundController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Every playground route requires an authenticated user
router.use(protect);

router.route("/collections").post(createCollection).get(getCollections);

router.route("/collections/:id").get(getCollection).delete(deleteCollection);

router.route("/collections/:id/requests").post(createRequest);

router.route("/requests/:id").patch(updateRequest).delete(deleteRequest);

router.route("/execute").post(executeRequest);

export default router;
