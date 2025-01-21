const User = require('../models/UserModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  const { username, password } = req.body

    if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' })
  }


  if (await doesUserExist(username)) {
    return res.status(400).json({ message: 'User already exists' })
  }

 const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    password: hashedPassword
  })

  const savedUser = await newUser.save()

  res.json(savedUser).status(201)
}

const loginUser = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  const user = await User.findOne({ username })

  if (!user) {
    return res.status(400).json({ message: 'User does not exist' })
  }

    const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid password' })
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

  res.json({ token }).status(200)
}

const logoutUser = async (req, res) => {
  const { username } = req.body

  if (!username) {
    return res.status(400).json({ message: 'Username is required' })
  }

  res.json({ message: 'Logout successful' }).status(200)
}

const doesUserExist = async (username) => {
  const user = await User.findOne({ username })

  return user ? true : false
}


module.exports = { registerUser, loginUser, logoutUser }
