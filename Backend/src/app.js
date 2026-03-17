import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './Routes/user.routes.js'
import videoRouter from './Routes/video.routes.js'
import subscriptionRouter from './Routes/subscription.routes.js'
import playlistrouter from '../src/Routes/playlist.routes.js'
import commentsrouter from '../src/Routes/comments.routes.js'
import likesrouter from '../src/Routes/like.routes.js'
import { swaggerUi, specs } from './swagger.js'
import path from 'path'
const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
)

app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.static('public'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.get('/', (req, res) => {
  res.send('API is working')
})

app.use('/api/v1/user', userRouter)

app.use('/api/v1/video', videoRouter)

app.use('/api/v1/subscription', subscriptionRouter)

app.use('/api/v1/playlist', playlistrouter)

app.use('/api/v1/comments', commentsrouter)

app.use('/api/v1/likes', likesrouter)
const __dirname = path.resolve();

// Serve frontend
app.use(express.static(path.join(__dirname, "Frontend", "dist")));

// fallback (VERY IMPORTANT)
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
}); 
export default app
