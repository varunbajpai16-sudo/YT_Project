import asyncHandler from '../utils/asynchandler.uitls.js'
import apiresponse from '../utils/apiresponse.utils.js'
import apierror from '../utils/apierror.utils.js'
import { Comment } from '../models/comment.models.js'
import mongoose from 'mongoose'
import { Video } from '../models/videos.models.js'
import { Like } from '../models/like.models.js'

const ToggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params

  if (!videoId) {
    throw new apierror(400, 'VideoId is required')
  }

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apierror(400, 'Invalid video id')
  }

  const video = await Video.findById(videoId)

  if (!video) {
    throw new apierror(404, 'Video Dose not exist')
  }

  const user = await Like.findOne({
    video:videoId,
    likedBy:req.user._id
  })

  if(user){
    throw new apierror(300,"User like this video already")
  }

  const like = await Like.create({
    video: videoId,
    likedBy: req.user._id,
  })

  res.status(200).json(new apiresponse(200, 'Video is liked ', like))
})


const ToggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.body

  if (!commentId) {
    throw new apierror(400, 'commentId is required')
  }

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new apierror(400, 'Invalid comment id')
  }

  const comment = await Comment.findById(commentId)

  if (!commentId) {
    throw new apierror(404, 'comment Dose not exist')
  }

  const user = await Like.findOne({
    comment:commentId,
    likedBy:req.user._id
  })

  if(user){
    throw new apierror(300,"User like this comment already")
  }

  const like = await Like.create({
    comment: commentId,
    likedBy: req.user._id,
  })

  res.status(200).json(new apiresponse(200, 'Commnet is liked ', like))
})

const GetVideolikes = asyncHandler(async(req,res)=>{
    const {videoId} = req.params;

    if(!videoId){
        throw new apierror(400,"Video id required")
    }

    const likes = await Like.find({
        video:videoId
    })
    
    res.status(200).json(new apiresponse(200,"Video Likes Featched Sucessfully",likes))
})

const GetCommnetlikes = asyncHandler(async(req,res)=>{
    const {commentId} = req.params;

    if(!commentId){
        throw new apierror(400,"comment id required")
    }

    const likes = await Like.find({
        comment:commentId
    })
    
    res.status(200).json(new apiresponse(200,"comment Likes Featched Sucessfully",likes))
})




export { ToggleVideoLike ,ToggleCommentLike,GetVideolikes,GetCommnetlikes}
