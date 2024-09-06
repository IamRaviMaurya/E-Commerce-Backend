const Product = require("../models/Product");

const addProduct = async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    date: req.body.date,
    available: req.body.available,
  });

  await product.save();
  res.json({ success: true, name: req.body.name });
};

const removeProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await Product.findOneAndDelete({ id: productId });

    if (result) {
      res.json({
        success: true,
        message: `Product with id ${productId} has been deleted successfully.`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Product with id ${productId} not found.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `An error occurred while deleting the product: ${error.message}`,
    });
  }
};

const productList = async (req, res) => {
  try {
    res.send(await Product.find({}));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProduct, removeProduct, productList };
