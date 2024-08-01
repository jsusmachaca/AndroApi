import jwt from 'jsonwebtoken'

process.loadEnvFile()

const SECRET_KEY = process.env.SECRET_KEY

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) return res.json({ message: 'token not provide' })

    const verifyToken = jwt.verify(token, SECRET_KEY)

    if (!verifyToken) {
      return res.status(400).json({
        success: false,
        message: 'error to trying auth'
      })
    }

    return next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.log(error.message)
      return res.status(400).json({ message: 'ta mal tu token' })
    }
  }
}
