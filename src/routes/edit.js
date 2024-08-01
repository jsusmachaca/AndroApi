import { Router } from 'express'
import { MemeController } from '../controllers/MemeController.js'
import { authMiddleware } from '../middlewares/auth.js'

const router = Router()

router.put('/edit', authMiddleware, MemeController.edit)

export default router
