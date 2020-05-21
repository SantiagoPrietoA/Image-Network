const ctrl = {};
const sidebar = require("../helpers/sidebar");

const { Image } = require("../models");

ctrl.getImages = async (req, res) => {
  const images = await Image.find().sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  viewModel = await sidebar(viewModel);
  res.render("index", viewModel);
};

module.exports = ctrl;
