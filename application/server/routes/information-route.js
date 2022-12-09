const express = require("express");
const router = express.Router();

const {
  getAllInformation,
  getInformation,
  createInformation,
  updateInformation,
  deleteInformation,
} = require("../controllers/information");


// router.get("/form" , (req , res) => {
//   res.sendFile('index.html',{root:"./public"});
//   // res.get(getAllInformation);
  
// });



router.route("/").get(getAllInformation);
router.route("/create-Info").post(createInformation);

router
  .route("/:id")
  .get(getInformation)
  .patch(updateInformation)
  .delete(deleteInformation);

module.exports = router;
