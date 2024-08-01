import { Router } from 'express'
import { MemeController } from '../controllers/MemeController.js'
import { authMiddleware } from '../middlewares/auth.js'

const router = Router()

router.post('/append', authMiddleware, MemeController.create)

export default router
