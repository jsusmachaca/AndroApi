import { Router } from 'express'
import { MemeController } from '../controllers/MemeController.js'

const router = Router()


router.put('/edit', MemeController.edit)


export default router