const { Router } = require("express");
const router = Router();

const { getImages } = require("../controllers/home.js");
const {
  getImage,
  create,
  like,
  comment,
  remove,
} = require("../controllers/image.js");

router.route("/").get(getImages);
router.route("/images/image_id").get(getImage);
router.route("/images").post(create);
router.route("/images/image_id/like").post(like);
router.route("/images/image_id/comment").post(comment);
router.route("/images/image_id").delete(remove);

module.exports = router;
