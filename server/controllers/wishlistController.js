import Wishlist from "../models/Wishlist.js";

// @desc    create new wishlist (post)
// @route http://localhost:5000/api/wishlists/create

export const createWishlist = async (req, res) => {
  const { product_name, product_price, product_category, product_image } =
    req.body;

  const isAdded = await Wishlist.findOne({ product_name });

  if (isAdded)
    return res
      .status(400)
      .json({ message: "Product already added to wishlist" });

  const wishlist = new Wishlist({
    user: req.user.id,
    product_name,
    product_price,
    product_category,
    product_image,
  });
  try {
    const savedWishlist = await wishlist.save();
    res.status(200).json(savedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    get wishlist by user id (get)
// @route http://localhost:5000/api/wishlists/:userId

export const getUserWishlist = async (req, res) => {
  const { id } = req.user;

  try {
    const wishlist = await Wishlist.find({ user: id });
    return res.status(200).json(wishlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    delete wishlist by id (delete)
// @route http://localhost:5000/api/wishlists/:id

export const deleteWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findById({ _id: req.params.id });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: "User Not Found !" });
    }

    if (wishlist.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User Not Autherized" });
    }
    await wishlist.remove();
    return res.status(200).json({ message: "Wishlist deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
