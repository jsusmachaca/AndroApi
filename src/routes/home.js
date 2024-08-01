import { Router } from 'express'
import { MemeController } from '../controllers/MemeController.js'
import { authMiddleware } from '../middlewares/auth.js'

const router = Router()

router.get('/', authMiddleware, MemeController.getAll)
router.get('/search', authMiddleware, MemeController.getByName)

export default router
