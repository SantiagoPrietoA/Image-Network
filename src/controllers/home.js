const ctrl = {};

const { Image } = require("../models");

ctrl.getImages = async (req, res) => {
  const images = await Image.find().sort({ timestamp: -1 });
  // let viewModel = { images: [] };
  // viewModel.images = images;
  res.render("index", {
    images: images,
  });
};

module.exports = ctrl;
