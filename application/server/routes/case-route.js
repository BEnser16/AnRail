const express = require("express");
const router = express.Router();

const {
  getAllCase,
  getCase,
  createCase,
  updateCase,
  deleteCase,
} = require("../controllers/case");

router.route("/").get(getAllCase);
router.route("/create-case").post(createCase);

router.route("/:id").get(getCase).patch(updateCase).delete(deleteCase);

module.exports = router;
