const User = require('../../models/User');
const Order = require('../../models/Order');


const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || req.query.q || '';
    const role = req.query.role;
    const isBlocked = req.query.isBlocked;

    let query = {};

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { fullName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    if (role && ['user', 'admin'].includes(role)) query.role = role;
    if (isBlocked === 'true') query.isBlocked = true;
    else if (isBlocked === 'false') query.isBlocked = false;

    const [users, total] = await Promise.all([
      User.find(query).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(query)
    ]);

    const userEmails = users.map(u => u.email);

    const orderStats = await Order.aggregate([
      { $match: { userEmail: { $in: userEmails } } },
      {
        $group: {
          _id: '$userEmail',
          totalSpent: { $sum: '$total' },
          orderCount: { $sum: 1 },
          orders: {
            $push: {
              orderNumber: '$orderNumber',
              status: '$status',
              total: '$total',
              date: '$date',
              items: '$items'
            }
          }
        }
      }
    ]);

    const statsMap = {};
    orderStats.forEach(stat => { statsMap[stat._id] = stat; });

    const usersWithStats = users.map(user => ({
      ...user.toObject(),
      totalSpent: statsMap[user.email]?.totalSpent || 0,
      orderCount: statsMap[user.email]?.orderCount || 0,
      orders: (statsMap[user.email]?.orders || []).slice(0, 3)
    }));

    res.json({
      success: true,
      users: usersWithStats,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        itemsPerPage: limit
      },
      filters: { search: search || null, role: role || null, isBlocked: isBlocked || null }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const orderStats = await Order.aggregate([
      { $match: { userEmail: user.email } },
      {
        $group: {
          _id: '$userEmail',
          totalSpent: { $sum: '$total' },
          orderCount: { $sum: 1 },
          orders: {
            $push: {
              orderNumber: '$orderNumber',
              status: '$status',
              total: '$total',
              date: '$date',
              items: '$items'
            }
          }
        }
      }
    ]);

    const stats = orderStats[0] || { totalSpent: 0, orderCount: 0, orders: [] };

    res.json({
      success: true,
      user: { ...user.toObject(), ...stats }
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ message: error.message });
  }
};


const toggleUserBlock = async (req, res) => {
  try {
    const { isBlocked } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isBlocked,
        blockedAt: isBlocked ? new Date() : null,
        blockedBy: isBlocked ? req.user.Email : null
      },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      success: true,
      message: isBlocked ? 'User blocked successfully' : 'User unblocked successfully',
      user
    });
  } catch (error) {
    console.error('Toggle user block error:', error);
    res.status(500).json({ message: error.message });
  }
};


const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role))
      return res.status(400).json({ message: 'Invalid role' });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ success: true, message: `User role updated to ${role}`, user });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ message: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: error.message });
  }
};


const searchUsers = async (req, res) => {
  try {
    const { q, field, page = 1, limit = 20 } = req.query;

    if (!q) return res.status(400).json({ message: 'Search query is required' });

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const query = field && ['username', 'email', 'fullName', 'phone'].includes(field)
      ? { [field]: { $regex: q, $options: 'i' } }
      : { $or: [
          { username: { $regex: q, $options: 'i' } },
          { email: { $regex: q, $options: 'i' } },
          { fullName: { $regex: q, $options: 'i' } },
          { phone: { $regex: q, $options: 'i' } }
        ]
      };

    const [users, total] = await Promise.all([
      User.find(query).select('-password').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      User.countDocuments(query)
    ]);

    res.json({
      success: true,
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalResults: total,
        itemsPerPage: parseInt(limit)
      },
      searchQuery: q
    });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, getUserById, toggleUserBlock, updateUserRole, deleteUser, searchUsers };