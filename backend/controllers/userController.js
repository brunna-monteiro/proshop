import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

//Description: Auth user & get token
//Route: method POST /api/users/login
//Access: Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    // Creates a token with jwt valid for 30 days
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'})

    // Set JWT as HTTP-Only Cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      // covert maxAge from milliseconds to 30 days
    })

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

//Description: Register user
//Route: method POST /api/users
//Access: Public
const registerUser = asyncHandler(async (req, res) => {
  res.send('register user')
})

//Description: Logout user & clear cookie
//Route: method POST /api/users/logout
//Access: Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send('logout user')
})

//Description: Get user profile
//Route: method GET /api/users/profile
//Access: Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile')
})

//Description: Update user profile
//Route: method PUT /api/users/profile
//Access: Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile')
})

//Description: Get all users
//Route: method GET /api/users
//Access: Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('get users')
})

//Description: Get user by ID
//Route: method GET /api/users/:id
//Access: Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send('get user by id')
})

//Description: Delete user
//Route: method DELETE /api/users/:id
//Access: Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user')
})

//Description: Update user
//Route: method PUT /api/users/:id
//Access: Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('update user')
})


export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser
}
