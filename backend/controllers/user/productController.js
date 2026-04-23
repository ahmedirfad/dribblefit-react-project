const Product = require('../../models/Product');

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    let query = {};

    if (req.query.category && req.query.category !== 'all') {
      query.category = req.query.category;
    }

    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        hasNextPage: page < Math.ceil(totalProducts / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search products by name, team, league, or category
// @route   GET /api/products/search
// @access  Public
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const query = {
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { team: { $regex: q, $options: 'i' } },
        { league: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    };

    const products = await Product.find(query).skip(skip).limit(limit);
    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      count: products.length,
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single product by custom ID
// @route   GET /api/products/:id
// @access  Public
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

// ✅ REMOVED: createProduct, updateProduct, deleteProduct (these belong in admin)

module.exports = {
  getAllProducts,
  searchProducts,
  getProductById
};