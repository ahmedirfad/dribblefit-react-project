const Cart = require('../../models/Cart');

// Get cart items for logged-in user
const getCartItems = async (req, res) => {
  try {
    const userId = req.user.Id; // From auth middleware

    const cartData = await Cart.findOne({ user: userId });

    if (!cartData) {
      return res.status(200).json({ 
        success: true,
        cart: { items: [] }, 
        message: "Cart is Empty" 
      });
    }

    res.status(200).json({ 
      success: true, 
      cart: cartData 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Get Cart Items Error", 
      error: error.message 
    });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.Id;
    const { productId, name, price, image, size, quantity, team, league, customizationData } = req.body;

    const existingCart = await Cart.findOne({ user: userId });
    
    if (existingCart) {
      const existingItem = existingCart.items.find(item => 
        item.product === productId && 
        item.size === size &&
        JSON.stringify(item.customizationData || {}) === JSON.stringify(customizationData || {})
      );

      if (existingItem) {
        // Item exists, update quantity
        existingItem.quantity += quantity;
        if (existingItem.quantity > 10) existingItem.quantity = 10;
        await existingCart.save();
        return res.status(200).json({ 
          success: true,
          message: "Cart updated successfully" 
        });
      }

      // Add new item
      existingCart.items.push({
        product: productId,
        name,
        price,
        image,
        size,
        quantity,
        team,
        league,
        customizationData
      });
      await existingCart.save();
    } else {
      // Create new cart
      await Cart.create({
        user: userId,
        items: [{
          product: productId,
          name,
          price,
          image,
          size,
          quantity,
          team,
          league,
          customizationData
        }]
      });
    }

    res.status(200).json({ 
      success: true,
      message: "Added to cart successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Add to Cart Error", 
      error: error.message 
    });
  }
};

// Remove item
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.Id;
    const { productId, size } = req.params;

    const cartData = await Cart.findOne({ user: userId });

    if (!cartData) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const result = await Cart.updateOne(
      { user: userId },
      { $pull: { items: { product: productId, size: size } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    res.status(200).json({ 
      success: true,
      message: "Removed from cart successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Remove from Cart Error", 
      error: error.message 
    });
  }
};

const increaseQuantity = async (req, res) => {
  try {
    const userId = req.user.Id;
    const { productId, size } = req.params;

    const result = await Cart.updateOne(
      {
        user: userId,
        items: {
          $elemMatch: {
            product: productId,
            size: size,
            quantity: { $lt: 10 }
          }
        }
      },
      { $inc: { "items.$.quantity": 1 } }
    );

    if (result.modifiedCount === 0) {
      return res.status(406).json({ message: "Maximum limit 10 reached" });
    }

    res.status(200).json({ 
      success: true,
      message: "Quantity increased" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Increase Quantity Error", 
      error: error.message 
    });
  }
};

const decreaseQuantity = async (req, res) => {
  try {
    const userId = req.user.Id;
    const { productId, size } = req.params;

    const result = await Cart.updateOne(
      {
        user: userId,
        items: {
          $elemMatch: {
            product: productId,
            size: size,
            quantity: { $gt: 1 }
          }
        }
      },
      { $inc: { "items.$.quantity": -1 } }
    );

    if (result.modifiedCount === 0) {
      return res.status(406).json({ message: "Minimum limit 1 reached" });
    }

    res.status(200).json({ 
      success: true,
      message: "Quantity decreased" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Decrease Quantity Error", 
      error: error.message 
    });
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user.Id;

    await Cart.findOneAndDelete({ user: userId });

    res.status(200).json({ 
      success: true,
      message: "Cart cleared successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Clear Cart Error", 
      error: error.message 
    });
  }
};

const syncCart = async (req, res) => {
  try {
    const userId = req.user.Id;
    const { guestCart } = req.body;

    if (!guestCart || guestCart.length === 0) {
      return res.status(200).json({ message: "No guest cart to sync" });
    }

    let userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      // Create new cart with guest items
      userCart = new Cart({ user: userId, items: [] });
    }

    // Merge guest items
    guestCart.forEach(guestItem => {
      const existingItem = userCart.items.find(item => 
        item.product === guestItem.id && 
        item.size === guestItem.size &&
        JSON.stringify(item.customizationData || {}) === JSON.stringify(guestItem.customizationData || {})
      );

      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
        if (existingItem.quantity > 10) existingItem.quantity = 10;
      } else {
        userCart.items.push({
          product: guestItem.id,
          name: guestItem.name,
          price: guestItem.price,
          image: guestItem.image,
          size: guestItem.size,
          quantity: guestItem.quantity,
          team: guestItem.team,
          league: guestItem.league,
          customizationData: guestItem.customizationData
        });
      }
    });

    await userCart.save();

    res.status(200).json({ 
      success: true,
      message: "Cart synced successfully",
      cart: userCart
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Sync Cart Error", 
      error: error.message 
    });
  }
};

module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  syncCart
};