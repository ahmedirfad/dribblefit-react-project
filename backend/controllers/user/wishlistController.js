const wishlistModule = require("../../models/Wishlist");

// Get wishlist data for logged-in user
const getWishlistData = async (req, res) => {
  try {
    let userID = req.user.Id; // From protectRoutes middleware

    const wishlistData = await wishlistModule.findOne({ user: userID });

    if (!wishlistData || wishlistData?.items?.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Wishlist is Empty",
        wishlist: { items: [] }
      });
    }

    res.status(200).json({
      success: true,
      wishlist: wishlistData,
      message: "Wishlist fetched successfully"
    });
  } catch (e) {
    res.status(500).json({
      message: "Error in getWishlistData Function",
      error: e.message,
    });
  }
};

// add if not exists, remove if exists
const wishlistToggle = async (req, res) => {
  try {
    let userID = req.user.Id;
    let { productId } = req.params;
    const { name, price, image, team } = req.body;

    // Check if product exists in wishlist
    let exist = await wishlistModule.findOne({
      user: userID,
      "items.productId": productId,
    });

    if (exist) {
      // Remove from wishlist
      await wishlistModule.updateOne(
        { user: userID },
        { $pull: { items: { productId: productId } } }
      );
      return res.status(200).json({ 
        success: true,
        message: "Product removed from wishlist",
        action: "removed"
      });
    }

    // Add to wishlist
    await wishlistModule.updateOne(
      { user: userID },
      { 
        $addToSet: { 
          items: { 
            productId: productId,
            name: name,
            price: price,
            image: image,
            team: team || ''
          } 
        } 
      },
      { upsert: true }
    );

    return res.status(200).json({ 
      success: true,
      message: "Product added to wishlist",
      action: "added"
    });
  } catch (e) {
    res.status(500).json({
      message: "Error in wishlistToggle Function",
      error: e.message,
    });
  }
};

// Clear entire wishlist
const clearWishlist = async (req, res) => {
  try {
    let userID = req.user.Id;

    await wishlistModule.findOneAndDelete({ user: userID });

    res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully"
    });
  } catch (e) {
    res.status(500).json({
      message: "Error in clearWishlist Function",
      error: e.message,
    });
  }
};

module.exports = { 
  getWishlistData, 
  wishlistToggle,
  clearWishlist
};