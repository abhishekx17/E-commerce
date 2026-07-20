import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from "crypto";
import razorpay from "razorpay";

// global variables
const currency = "INR";

// gateway initialize
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

const getRazorpayInstance = () => {
  if (!razorpayKeyId || !razorpayKeySecret) {
    return null;
  }

  return new razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
  });
};

// placing order using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// placing order using razorpay Method
const placeOrderRazorpay = async (req, res) => {
  try {
    if (!razorpayKeyId || !razorpayKeySecret) {
      return res.json({
        success: false,
        message: "Razorpay keys are not configured",
      });
    }

    const razorpayInstance = getRazorpayInstance();
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: newOrder._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order, key: razorpayKeyId });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// verify razorpay payment and mark order paid
const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpayKeySecret) {
      return res.json({
        success: false,
        message: "Razorpay secret is not configured",
      });
    }

    const razorpayInstance = getRazorpayInstance();
    if (!razorpayInstance) {
      return res.json({
        success: false,
        message: "Razorpay keys are not configured",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.json({ success: false, message: "Payment verification failed" });
    }

    const razorpayOrder = await razorpayInstance.orders.fetch(razorpay_order_id);
    const orderId = razorpayOrder.receipt;
    const order = await orderModel.findById(orderId);

    if (!order || order.userId !== userId) {
      return res.json({ success: false, message: "Order not found" });
    }

    await orderModel.findByIdAndUpdate(orderId, { payment: true });
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Payment verified" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// All Orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// user order data fro frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  verifyRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
