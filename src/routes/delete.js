import { Router } from 'express'
import { MemeController } from '../controllers/MemeController.js'
import { authMiddleware } from '../middlewares/auth.js'

const router = Router()

router.delete('/del', authMiddleware, MemeController.delete)

export default router
