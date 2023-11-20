const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  try {
    const data = await userModel.getAllUsers();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userModel.getUserById(id);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createUser = async (req, res) => {
  const { userName, password, email, role } = req.body;
  try {
    if (!userName || !password || !email) {
      return res.status(400).json({ message: 'Thiếu thông tin' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(userName, hashedPassword, email, role);
    
    return res.status(201).json({ message: 'Tạo người dùng thành công' });
  } catch (error) {
    return res.status(500).json({ message: 'Có lỗi xảy ra' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { idUser, userName, password, email, role } = req.body;
    if (!idUser || !userName || !password || !email || !role) {
      return res.status(400).json({ message: 'Thiếu thông tin' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.updateUser(idUser, userName, hashedPassword, email, role);
    return res.status(200).json({ message: 'Update thành công' });
  } catch (error) {
    return res.status(500).json({ message: 'Có lỗi xảy ra' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await userModel.deleteUser(id);
    return res.status(200).json({ message: 'Đã xóa thành công' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// const loginUser = async (req, res) => {
//   const { userName, password } = req.body;
//   try {
//     if (!userName || !password) {
//       return res.status(400).json({ message: 'Thiếu thông tin' });
//     }
//     const user = await userModel.getUserByUserName(userName);

//     if (!user) {
//       return res.status(401).json({ message: 'Tên người dùng không tồn tại' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Mật khẩu không đúng' });
//     }

//     if (user.role === 0) {
//       return res.status(200).json({ message: 'Đăng nhập thành công - Trang home' });
//       // TODO: Generate and return authentication token for home page
//     } else {
//       return res.status(200).json({ message: 'Đăng nhập thành công - Trang admin' });
//       // TODO: Generate and return authentication token for admin page
//     }
//   } catch (error) {
//     return res.status(500).json({ message: 'Có lỗi xảy ra' });
//   }
// };
const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password) {
      return res.status(400).json({ message: 'Thiếu thông tin' });
    }
    const user = await userModel.getUserByUserName(userName);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'Tên người dùng không tồn tại' });
    }

    // So sánh mật khẩu không sử dụng băm
    if (password !== user.password) {
      return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }

    if (user.role === 0) {
      return res.status(200).json({ message: 'Đăng nhập thành công - Trang home' });
      // TODO: Generate and return authentication token for home page
    } else {
      return res.status(200).json({ message: 'Đăng nhập thành công - Trang admin' });
      // TODO: Generate and return authentication token for admin page
    }
  } catch (error) {
    return res.status(500).json({ message: 'Có lỗi xảy ra' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};