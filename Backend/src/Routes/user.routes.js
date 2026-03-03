/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: varun
 *               email:
 *                 type: string
 *                 example: varun@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

import { Router } from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshaccessToken,
  changePassword,
  getuser,
  updatauserdetails,
  updateavatar,
  updatecoverimage,
  getuserchannelprofile,
  getwatchhistory
} from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middlewares.js'
import { verifytoken } from '../middlewares/authentication.middlewares.js'
const router = Router()

router.post(
  '/register',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  registerUser,
)
router.post('/login', loginUser)
router.post('/logout', verifytoken, logoutUser)
router.post('/refresh-token', refreshaccessToken)
router.patch('/change-password', verifytoken, changePassword)
router.get('/getuser', verifytoken, getuser)
router.patch('/update-profile', verifytoken, updatauserdetails)
router.patch(
  '/update-avatar',
  verifytoken,
  upload.single('avatar'),
  updateavatar,
)
router.patch(
  '/update-coverimage',
  verifytoken,
  upload.single('coverimage'),
  updatecoverimage,
)
router.get('/getuserchannelprofile/:username', verifytoken, getuserchannelprofile)
router.get('/getwatchhistory', verifytoken, getwatchhistory)
export default router
