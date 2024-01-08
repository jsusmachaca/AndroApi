import { Router } from 'express'
import { MemeController } from '../controllers/MemeController.js'


const router = Router()


router.delete('/del', MemeController.delete)


export default router