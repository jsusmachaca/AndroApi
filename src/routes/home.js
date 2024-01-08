import { Router } from 'express'
import { MemeController } from '../controllers/MemeController.js'

const router = Router()


router.get('/', MemeController.getAll)
router.get('/search', MemeController.getByName)

export default router