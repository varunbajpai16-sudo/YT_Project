import asyncHandler from '../utils/asynchandler.uitls.js'
import { Video } from '../models/videos.models.js'
import uploadToCloudinary from '../utils/cloudinary.js'
import apiresponse from '../utils/apiresponse.utils.js'

const getallvideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortby = 'createdAt',
    order = 'desc',
    userid,
    query,
  } = req.query

  const filter = {}

  if (userid) {
    filter.userid = userid
  }

  if (query) {
    filter.title = { $regex: query, $options: 'i' }
  }

  const skip = (page - 1) * limit

  const videos = await Video.find(filter)
    .sort({ [sortby]: order === 'desc' ? -1 : 1 })
    .skip(skip)
    .limit(limit)
    .populate('owner')

  res
    .status(200)
    .json(new apiresponse(200, 'Videos fetched successfully', videos))
})

const uplodevideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body

  if (!title?.trim() || !description?.trim()) {
    res.status(400)
    throw new Error('All fields are required')
  }

  const videopath = req.files?.videofile?.[0]?.path
  const thumbnailpath = req.files?.thumbnail?.[0]?.path

  if (!videopath || !thumbnailpath) {
    res.status(400)
    throw new Error('Video file and thumbnail are required')
  }

  const videourl = await uploadToCloudinary(videopath)
  const thumbnailurl = await uploadToCloudinary(thumbnailpath)

  if (!videourl || !thumbnailurl) {
    res.status(500)
    throw new Error('Failed to upload video or thumbnail')
  }
console.log(videourl)
  const video = await Video.create({
    title: title.trim(),
    description: description.trim(),
    videofile: videourl.url,
    thumbnail: thumbnailurl.url,
    duration: videourl.duration,
    owner: req.user._id,
  })

  res
    .status(201)
    .json(new apiresponse(201, 'Video uploaded successfully', video))
})

const getvideobyid = asyncHandler(async (req, res) => {
  const videoid = req.params.id

  if (!videoid) {
    throw new Error('Video ID is required')
  }

  const video = await Video.findById(videoid)

  if (!video) {
    throw new Error('Video not found')
  }

  res
    .status(200)
    .json(new apiresponse(200, 'Video fetched successfully', video))
})

const updatevideo = asyncHandler(async (req, res) => {
  const videoid = req.params.id

  if (!videoid) {
    throw new Error('Video ID is required')
  }

  const { title, description } = req.body

  const updatedfields = {}

  if (title?.trim() && title.trim() !== undefined) {
    updatedfields.title = title.trim()
  }
  if (description?.trim() && description.trim() !== undefined) {
    updatedfields.description = description.trim()
  }

  if (req.files?.videofile) {
    const videopath = req.files?.videofile?.[0]?.path
  }

  if (Object.keys(updatedfields).length === 0) {
    res.status(400)
    throw new Error('At least one field is required to update')
  }

  const updatedvideo = await Video.findByIdAndUpdate(
    videoid,
    { $set: updatedfields },
    { new: true },
  )

  res
    .status(200)
    .json(new apiresponse(200, 'Video updated successfully', updatedvideo))
})

const deletevideo = asyncHandler(async (req, res) => {
  const videoid = req.params.id

  if (!videoid) {
    throw new Error('Video ID is required')
  }

  const video = await Video.findByIdAndDelete(videoid)

  if (!video) {
    throw new Error('Video not found')
  }
  res
    .status(200)
    .json(new apiresponse(200, 'Video deleted successfully', video))
})

const togglevideostatus = asyncHandler(async (req, res) => {
  const videoid = req.params.id

  if (!videoid) {
    throw new Error('Video ID is required')
  }

  const updatedvideo = await Video.findByIdAndUpdate(
    videoid,
    [
      {
        $set: {
          isPublished: { $not: '$isPublished' },
        },
      },
    ],
    {
      new: true,
      updatePipeline: true,
    },
  )

  if (!updatedvideo) {
    throw new Error('Video not found')
  }

  res
    .status(200)
    .json(
      new apiresponse(200, 'Video status toggled successfully', updatedvideo),
    )
})

export {
  getallvideos,
  uplodevideo,
  getvideobyid,
  updatevideo,
  deletevideo,
  togglevideostatus,
}
