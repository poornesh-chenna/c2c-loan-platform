import express from 'express'
import { User } from '../models/users.js'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { signJwtToken } from '../utils/jwt.js'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { nanoid } from 'nanoid'
import { generateCibil } from '../utils/getCibilscore.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const verified = true
  const foundUser = await User.findOne({ email: req.body.email })
  if (!foundUser) {
    res.status(400).send({ message: 'Email is not registered with us' })
    return
  }
  if (foundUser.password === req.body.password) {
    const userId = foundUser._id
    const verified = true
    if (verified) {
      res.status(200).send({
        message: 'User successfully authenticated',
        jwtToken: signJwtToken(userId),
        userDetails: {
          username: foundUser.username,
          email: foundUser.email,
          isProfileCompleted: foundUser.isProfileCompleted,
        },
      })
    }
  } else {
    res.status(400).send({ message: 'Invalid password' })
  }
})

router.post('/signup', async (req, res) => {
  const foundUser = await User.findOne({ email: req.body.email })
  if (foundUser) {
    return res.status(400).send({
      message: 'This email is already registered with us',
    })
  } else {
    const newUser = await new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }).save()

    res.status(200).send({ message: 'Successfully registered' })
  }
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + path.extname(file.originalname))
  },
})
var upload = multer({ storage: storage })

fileFilter: (req, file, callback) => {
  let ext = path.extname(file.originalname)
  if (ext !== '.png' || ext !== '.jpg' || ext !== '.jpeg') {
    return callback(null, false)
  }
  callback(null, true)
}

router.patch(
  '/profile-screen',
  authorizeUser,
  upload.any(),
  async (req, res) => {
    const cibilScore = await generateCibil(req.userId, req.body.salary)
    const imageFilenames = {}
    req.files.forEach((file) => {
      imageFilenames[file.fieldname] = file.filename
    })
    User.updateOne(
      { _id: req.userId },
      {
        profile_image: imageFilenames['profile'],
        aadhar_image: imageFilenames['aadhar'],
        pancard_image: imageFilenames['pan'],
        salary: req.body.salary,
        bank_name: req.body.bankName,
        customer_name: req.body.customer_name,
        Account_no: req.body.accountNo,
        cibil: cibilScore,
        isProfileCompleted: true,
      },
      (err, data) => {
        if (err) {
          res.status(500).send({
            message: 'cant update user profile records',
          })
        } else {
          res.status(200).send({
            message: 'successfully updated records',
          })
        }
      }
    )
  }
)

router.get('/profile-page', authorizeUser, async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.userId }).select(
      '-password'
    )
  } catch (err) {
    res.status(500).send({
      message: 'failed to fetch the user profile details',
    })
    return
  }

  res.status(200).send({ foundUser })
})

export const AuthRouters = router
