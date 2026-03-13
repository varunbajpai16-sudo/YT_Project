import {Router} from 'express'
import { addcomment, getVideoComments,updatecomment,deletecomment } from '../controllers/comment.controller.js'
import { verifytoken } from '../middlewares/authentication.middlewares.js'
const router = Router()



router.get("/video-comments/:videoId",getVideoComments)
router.use(verifytoken)
router.post("/add-comment",addcomment)
router.patch("/update-comment/:commentId",updatecomment)
router.delete("/delete-comment/:commentId",deletecomment)
export default router