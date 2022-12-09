const express = require("express");
const router = express.Router();

const {
  getAllRecord,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/record");

router.route("/").get(getAllRecord);
router.route("/create-record").post(createRecord);

router.route("/:id").get(getRecord).patch(updateRecord).delete(deleteRecord);

module.exports = router;
