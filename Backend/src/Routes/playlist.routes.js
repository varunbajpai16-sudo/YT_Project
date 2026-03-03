import Router from 'express' 
import { getuserplaylist,addvideotoplaylist, createplaylist, getplaylistbyId,removevideofromplaylist ,deletePlaylist,updateplaylist} from "../controllers/playlist.controller.js"
import { verifytoken } from "../middlewares/authentication.middlewares.js";
const router = Router();

router.use(verifytoken);

router.post("/create-playlist",createplaylist);

router.patch("/add-video",addvideotoplaylist)

router.get("/user-playlist/:userid",getuserplaylist)

router.get("/playlist-by-id/:playlistId",getplaylistbyId)

router.patch("/delete-video",removevideofromplaylist)

router.delete("/delete-playlist/:PlaylistId",deletePlaylist);
router.patch("/update-playlist/:playlistId",updateplaylist)
export default router;
