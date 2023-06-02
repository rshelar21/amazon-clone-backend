const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required", result : false});
    }
    const searchUser = await userModel.findOne({ email });

    if (!searchUser)
      return res.status(404).json({ message: "User does not exist" , result : false});

    const checkPassword = await bcrypt.compare(password, searchUser.password);

    if (!checkPassword)
      return res.status(404).json({ message: "Invalid Password", result : false });

    const token = await jwt.sign(
      { email: searchUser.email, id: searchUser._id },
      "testone",
      { expiresIn: "1h" }
    );


    res.status(200).json({
      result: true,
      token,
      email: searchUser.email,
      name: searchUser.name,
      id : searchUser._id,
      message : "Login Successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" , result : false});
  }
};

const register = async (req, res) => {
  const { email, password, phone, name } = req.body;
  try {
    if (!email || !password || !phone || !name) {
      return res.status(400).json({ message: "All fields are requiered", result : false });
    }

    const alreadyUser = await userModel.findOne({ email });
    if (alreadyUser) {
      return res.status(400).json({ message: "User already exists", result : false });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      email,
      password: hashPassword,
      name,
      phone,
    });

    const token = await jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
      },
      "testone",
      { expiresIn: "1h" }
    );


    res
      .status(200)
      .json({ result: true, token, email: newUser.email, name: newUser.name , id : newUser._id , message : "Registerd Successfully"});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", result : false });
  }
};
module.exports = {
  login,
  register,
};
