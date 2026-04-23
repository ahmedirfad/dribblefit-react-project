// Check if user has admin role
const adminMiddleware = (req, res, next) => {
  try {
    // User should already be set by protectRoutes middleware
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Unauthorized. Please login first.' 
      });
    }
    
    // Check if user role is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. Admin privileges required.' 
      });
    }
    
    // User is admin, proceed to next middleware/controller
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
};

module.exports = adminMiddleware;