import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:9000',
  'http://localhost:8000',
  'https://androapi-dev-ggte.4.us-1.fl0.io'
]

const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin:
      (origin, callback) => {
        if (acceptedOrigins.includes(origin)) {
          return callback(null, true)
        }
        if (!origin) {
          return callback(null, true)
        }
        return callback(new Error('Not Allowed by CORS'))
      }
  })
}

export default corsMiddleware
