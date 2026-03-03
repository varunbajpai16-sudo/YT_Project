import Router from "express"
import { GetCommnetlikes, GetVideolikes, ToggleCommentLike, ToggleVideoLike } from "../controllers/like.controller.js"
import {verifytoken} from "../middlewares/authentication.middlewares.js"


const router = Router();

router.use(verifytoken);
router.post("/like-video/:videoId",ToggleVideoLike);
router.post("/like-comment",ToggleCommentLike);
router.get("/video-likes/:videoId",GetVideolikes)
router.get("/comment-likes/:commentId",GetCommnetlikes)

export default router