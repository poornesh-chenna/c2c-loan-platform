import express from "express";
import { User } from "../models/users.js";
import { authorizeUser } from "../middlewares/authorizeUser.js";
import { signJwtToken } from "../utils/jwt.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  const verified = true;
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    res.status(400).send({ message: "Email is not registered with us" });
  } else {
    if (foundUser.password === req.body.password) {
      const userId = foundUser._id;
      const verified = true;
      if (verified) {
        res.status(200).send({
          message: "User successfully authenticated",
          jwtToken: signJwtToken(userId),
        });
      }
    } else {
      res.status(400).send({ message: "Invalid password" });
    }
  }
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    res
      .status(400)
      .send({ message: "This email is already registered with us" });
  } else {
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    await newUser.save();
    res.status(200).send({ message: "Successfully registered" });
  }
});

router.patch("/profile-screen", authorizeUser, (req, res) => {
  //   User.updateOne(
  //     { _id: req.userId },
  //     {
  //       photo: req.body.photo,
  //     },
  //     (err) => {
  //       if (err) {
  //         res.status(500).send({ message: "cant update user" });
  //       } else {
  //         res.status(200).send({ message: "successfully updated records" });
  //       }
  //     }
  //   );
});

export const AuthRouters = router;
