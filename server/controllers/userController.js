import User from "../modules/userModel.js";

export const getStats = async (req, res) => {
  try {
    const total = await User.countDocuments();
    const active = await User.countDocuments({ status: "Active" });
    const inactive = await User.countDocuments({ status: "Inactive" });
    res.status(200).json({ total, active, inactive });
  } catch (error) {
    res.status(500).json({
      message: "Error fetch statistics",
      error: error.message,
    });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const query = req.params.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchQuery = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { status: { $regex: query, $options: "i" } },
      ],
    };

    const users = await User.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(searchQuery);

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching search",
      error: error.message,
    });
  }
};

//get All Users
export const getAllUsers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

//get Single User
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.is);
    if (!user) return res.status(404).json({ message: "user not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching User",
      error: error.message,
    });
  }
};

//create user
export const createUser = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "Name , email , phone are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "This email already exist" });

    const user = new User({
      name,
      email,
      phone,
      status: status || "Active",
    });
    user.save();
    res.status(201).json({
      data: user,
      message: "User created successfullyy",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating User",
      error: error.message,
    });
  }
};

//update user
export const updateUser = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;

    if (email) {
      const exists = await User.find({ email, _id: { $ne: req.params.id } });
      if (exists.length > 0) {
        return res
          .status(400)
          .json({ message: "This email already exists !!!" });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, status },
      { new: true, runValidators: true },
    );

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error updating User",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json({ message: "user deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting User",
      error: error.message,
    });
  }
};
