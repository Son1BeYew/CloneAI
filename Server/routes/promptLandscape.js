const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  create,
  update,
  delete: deleteOne,
} = require("../controllers/promptLandscapeController");

// Public routes
router.get("/", getAll);
router.get("/:id", getById);

// Admin routes
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteOne);

module.exports = router;
