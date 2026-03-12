import { Router } from 'express'
import {
  getallvideos,
  uplodevideo,
  getvideobyid,
  updatevideo,
  deletevideo,
  togglevideostatus,
  getuservdeosbyid,
} from '../controllers/video.controller.js'
import { upload } from '../middlewares/multer.middlewares.js'
import { verifytoken } from '../middlewares/authentication.middlewares.js'

const router = Router()

router.get('/getallvideos', getallvideos)
router.use(verifytoken)
router.post(
  '/uploadvideo',
  upload.fields([
    { name: 'videofile', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]),
  uplodevideo,
)
router.get('/getvideobyid/:id', getvideobyid)
router.patch('/updatevideo/:id', upload.single('videofile'), updatevideo)
router.delete('/deletevideo/:id', deletevideo)
router.patch('/togglevideoprivacy/:id', togglevideostatus)
router.get('/getuservideos', getuservdeosbyid)

export default router
