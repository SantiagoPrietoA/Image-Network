const fs = require("fs-extra");
const ctrl = {};
const path = require("path");
const md5 = require("md5");
const { randomNumber } = require("../helpers/libs");

const { Image, Comment } = require("../models");

ctrl.getImage = async (req, res) => {
  const viewModel = { image: {}, comments: {} };
  const image = await Image.findOne({
    filename: { $regex: req.params.image_id },
  });
  if (image) {
    image.views = image.views + 1;
    viewModel.image = image;
    await image.save();
    const comments = await Comment.find({
      image_id: image._id,
    });
    viewModel.comments = comments;

    res.render("image", viewModel);
  } else {
    res.redirect("/");
  }
};

ctrl.create = async (req, res) => {
  const saveImage = async () => {
    const imgUrl = randomNumber();
    const images = await Image.find({ filename: imgUrl });
    if (images.length > 0) {
      saveImage();
    } else {
      // Image Location
      const imageTempPath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();
      const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

      // Validate Extension
      if (
        ext === ".png" ||
        ext === ".jpg" ||
        ext === ".jpeg" ||
        ext === ".gif"
      ) {
        // you wil need the public/temp path or this will throw an error
        await fs.rename(imageTempPath, targetPath);
        // add in db
        const newImg = new Image({
          title: req.body.title,
          filename: imgUrl + ext,
          description: req.body.description,
        });
        const imageSaved = await newImg.save();
        res.redirect("/images/" + imgUrl);
      } else {
        await fs.unlink(imageTempPath);
        res.status(500).json({ error: "Only Images are allowed" });
      }
    }
  };

  saveImage();
};

ctrl.like = async (req, res) => {
  const image = await Image.findOne({
    filename: { $regex: req.params.image_id },
  });
  if (image) {
    image.likes += 1;
    image.save();
    res.json({ likes: image.likes });
  } else {
    res.status(500).json({ error: "internal error" });
  }
};

ctrl.comment = async (req, res) => {
  const image = await Image.findOne({
    filename: { $regex: req.params.image_id },
  });

  if (image) {
    const newComment = new Comment(req.body);
    newComment.image_id = image._id;
    newComment.gravatar = md5(newComment.email);
    await newComment.save();
    res.redirect("/images/" + image.uniqueId);
  } else {
    res.redirect("/");
  }
};

ctrl.remove = (req, res) => res.json({ message: "delete" });

module.exports = ctrl;
