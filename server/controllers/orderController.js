import Order from "../models/Order.js";

// @desc    Create new order (post)
// @route   http://localhost:5000/api/orders/new_order

export const newOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    get user orders (get)
// @route   http://localhost:5000/api/orders/my_orders

export const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });

    if (!orders) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all orders (get)
// @route   http://localhost:5000/api/orders/

export const allOrder = async (req, res) => {
  try {
    const orders = await Order.find();

    return res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete order (delete)
// @route   http://localhost:5000/api/orders/delete_order/:orderId

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById({ _id: req.params.orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.remove();

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single order (get)
// @route   http://localhost:5000/api/orders/:orderId

export const singleOrder = async (req, res) => {
  try {
    const order = await Order.findById({ _id: req.params.orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
