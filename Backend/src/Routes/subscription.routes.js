import  Router  from 'express'
import { verifytoken } from '../middlewares/authentication.middlewares.js'
import { toggleSubscription } from '../controllers/subscription.controller.js'

const router = Router()

router.use(verifytoken)
router.post('/toggle/:channelId',toggleSubscription)

export default router