import { Router } from 'express'
import { MemeController } from '../controllers/MemeController.js'



const router = Router()


router.post('/append', MemeController.create)

export default router