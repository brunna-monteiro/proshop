import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"

//Description: Auth user & get token
//Route: method POST /api/users/login
//Access: Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
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
