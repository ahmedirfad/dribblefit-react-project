const Product = require('../../models/Product');

// @desc    Get all products (admin view with pagination)
// @route   GET /api/admin/products
// @access  Admin only
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;
    const { category, search } = req.query;
    
    let query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Product.countDocuments(query);
    
    res.json({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by ID (admin view)
// @route   GET /api/admin/products/:id
// @access  Admin only
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/admin/products
// @access  Admin only
const createProduct = async (req, res) => {
  try {
    const productId = req.body.id || Date.now().toString();
    
    // imageUrl comes from Cloudinary upload
    const imageUrl = req.body.image; // This will be the Cloudinary URL
    
    const productData = {
      ...req.body,
      id: productId,
      image: imageUrl,  // Store Cloudinary URL
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const product = new Product(productData);
    const savedProduct = await product.save();
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: savedProduct
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Admin only
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Admin only
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get products by stock status
// @route   GET /api/admin/products/stock/:status
// @access  Admin only
const getProductsByStock = async (req, res) => {
  try {
    const { status } = req.params;
    let query = {};
    
    if (status === 'outofstock') {
      query.inStock = false;
    } else if (status === 'instock') {
      query.inStock = true;
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      products,
      count: products.length
    });
  } catch (error) {
    console.error('Get products by stock error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByStock
};