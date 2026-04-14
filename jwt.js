// JWT = JSON Web Token
// string has encrypted and expected data used in authentication and auhorization
// flow : login -> server check data -> server send jwt -> user senf this jwt token in every req -> server check token
import jwt from 'jsonwebtoken'

const token = jwt.sign(
  { userId: user.id, role: user.role }, // payload
  process.env.JWT_SECRET,              // secret
  { expiresIn: '7d' }                  // expiration
)

// send token to frontend :
res.json({ token })
// you can send it in cookies (more safety)


// middleware for checking token :
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'No token' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

//USE IT IN ROUTING :
app.get('/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user })
})

//Backend is resbonsible for :
// create token 
// check token
// refuse any request has expired token or withou token
// controlling authorization and permisiion for users 

// from frontend
POST /login
{
  email,
  password
}

// store token 
// LocalStorage
localStorage.setItem('token', token)
//Cookies : HttpOnly - Secure

// send token with req :
axios.get('/profile', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

// if server returns 401 unauthorized ==>> delete token and navigate to login 

// frontEnd is resbonsible for :
// save token 
// send token in headers of req 
// treats with expired and unauthorized 

