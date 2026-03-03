import asyncHandler from '../utils/asynchandler.uitls.js'
import apiresponse from '../utils/apiresponse.utils.js'
import apierror from '../utils/apierror.utils.js'
import { Comment } from '../models/comment.models.js'
import mongoose from 'mongoose'
import { Video } from '../models/videos.models.js'
const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params
  const { page = 1, limit = 10 } = req.query

  if (!videoId) {
    throw new apierror(400, 'VideoId id is required')
  }

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apierror(400, 'Invalid video id')
  }

  const skip = (page - 1) * limit

  const comments = await Comment.find({ video: videoId })
    .skip(skip)
    .limit(Number(limit))

  res
    .status(200)
    .json(new apiresponse(200, 'Comments fetched successfully', comments))
})

const addcomment = asyncHandler(async (req, res) => {
  const { content, videoId } = req.body

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apierror(400, 'Invalid video id')
  }

  if (!content?.trim()) {
    throw new apierror(400, 'Comment content is required')
  }

  const video = await Video.findById(videoId)

  if (!video) {
    throw new apierror(404, 'Video does not exist')
  }

  const newcomment = await Comment.create({
    content: content.trim(),
    video: videoId,
    owner: req.user._id,
  })

  const populatedComment = await Comment.findById(newcomment._id).populate(
    'owner',
    'username avatar',
  )

  res
    .status(201)
    .json(new apiresponse(201, 'Comment added successfully', populatedComment))
})

const updatecomment = asyncHandler(async (req, res) => {
  const {commentId} = req.params
  const { updatedcontent } = req.body

  if (!commentId) {
    throw new apierror(400, 'CommentId is required')
  }

  const updatedcomment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: { content: updatedcontent },
    },
    {
      new: true,
    },
  )

  if(!updatedcomment){
    throw new apierror(404,"Comment not found")
  }

  res.status(200).json(new apiresponse(200,"Comment updated succefully",updatedcomment))

})


const deletecomment = asyncHandler(async(req,res)=>{
      const {commentId} = req.params

  if (!commentId) {
    throw new apierror(400, 'CommentId is required')
  }

  const comment = await Comment.findByIdAndDelete(commentId)

  if(!comment){
    throw new apierror(404,"Commnet dose not exist")
  }

  res.status(200).json(new apiresponse(200,"Comment deleted sucessfully",comment));
})
export { getVideoComments, addcomment ,updatecomment,deletecomment}
