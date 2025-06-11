import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all fields' });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProductData = req.body;

  if (
    !updatedProductData.name ||
    !updatedProductData.price ||
    !updatedProductData.image
  ) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all fields' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedProductData,
      {
        new: true, // return the updated document
        runValidators: true, // validate the update
      }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};