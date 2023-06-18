import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendMail } from "../utils/sendMail.js";

// @desc    admin login (post)
// @route http://localhost:5000/api/auth/admin/login

export const adminLogin = (req, res) => {
  try {
    const { username, password } = req.body;
    if (username === "harry408" && password === "harry111") {
      const admin_token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      res.status(200).json({ username, admin_token });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    user registeration (post)
// @route http://localhost:5000/api/auth/register

export const userRegister = async (req, res) => {
  try {
    const { username, email, password, image } = req.body;
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      username,
      email,
      password: hashPassword,
      image,
    });
    if (result) return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    user login (post)
// @route http://localhost:5000/api/auth/userLogin

export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const user_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    return res.status(200).json({
      _id: user.id,
      name: user.username,
      email: user.email,
      image: user.image,
      cartItems: user.cartItems.map((item) => ({ pid: item.product })),
      user_token: user_token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// @desc    get user profile (get)
// @route http://localhost:5000/api/auth/me

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ message: "User not found" });
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// @desc    update user profile (put)
// @route http://localhost:5000/api/auth/update

export const updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    await User.findByIdAndUpdate(
      req.user.id,
      {
        username,
        email,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// @desc    change user password (put)
// @route http://localhost:5000/api/auth/changePassword

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
      return res.status(400).json({ message: "Please enter all fields" });

    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old Password is Wrong" });
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await User.findByIdAndUpdate(
        req.user.id,
        { password: hashedPassword },
        { new: true }
      );
      return res.status(200).json({ message: "Password changed successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// @desc    forgot user password (post)
// @route http://localhost:5000/api/auth/forgotpassword
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    await user.save();

    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`;

    await sendMail(user.email, "E-com Reset Password", message);

    return res.status(200).json({ message: "Password reset link sent !" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// @desc    reset user password (put)
// @route http://localhost:5000/api/auth/resetpassword/:token
export const resetPassword = async (req, res) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid token or token expired" });
  }

  user.password = await bcrypt.hash(req.body.password, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return res.status(200).json({ message: "Password Changed Successfully" });
};
