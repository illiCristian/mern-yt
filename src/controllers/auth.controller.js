import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

import { createAccessToken } from "../lib/jwt.js";
export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    //Creamos el usuario
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });
    //Guardamos el usuario en la db
    const userSaved = await newUser.save();
    //Creamos el token
    const token = createAccessToken({ id: userSaved._id });
    //Guardamos el token en la cookie
    res.cookie("token", token);
    //Devolvemos el usuario
    res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });
    //Creamos el token
    const token = await createAccessToken({ id: userFound._id });
    //Guardamos el token en la cookie
    res.cookie("token", token);
    //Devolvemos el usuario
    res.status(201).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
