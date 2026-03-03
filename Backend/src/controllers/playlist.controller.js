import asyncHandler from '../utils/asynchandler.uitls.js'
import apiresponse from '../utils/apiresponse.utils.js'
import apierror from '../utils/apierror.utils.js'
import { Playlist } from '../models/playlist.models.js'



const createplaylist = asyncHandler(async (req, res) => {

  const { name, description } = req.body

  if (!name?.trim() || !description?.trim()) {
    throw new apierror(400, 'Name and description are require')
  }

  const playlist =  await Playlist.create(
    {
      name: name,
      description: description,
      videos: [],
      owner: req.user._id,
    },
  )


  return res
    .status(200)
    .json(new apiresponse(200, 'New Playlist created successfully', playlist))
})

const addvideotoplaylist = asyncHandler(async (req, res) => {
const { playlistId, videoId } = req.body

if (!playlistId || !videoId) {
  throw new apierror(400, 'playlistId and videoId are required')
}

const updatedPlaylist = await Playlist.findByIdAndUpdate(
  playlistId,
  {
    $addToSet: {
      videos: videoId,
    },
  },
  { new: true }
)

if (!updatedPlaylist) {
  throw new apierror(404, 'Playlist not found')
}

return res.status(200).json(
  new apiresponse(200, 'Video added to playlist successfully', updatedPlaylist)
)

})

const getuserplaylist = asyncHandler(async(req,res)=>{

    const {userid} = req.params

    if(!userid){
        throw new apierror(400,"User is is require")
    }

    // const playlists = await Playlist.find({
    //     owner:userid
    // })

    const playlists = await Playlist.find({ owner: userid })
  .populate("videos")
  .sort({ createdAt: -1 })

    if(!playlists){
        throw new apierror(404,"PlayList not Found")
    }
    
    if(playlists.length===0){
      res.status(300).json(new apiresponse(300,"No playlist Found"))
    }
    
    res.status(200).json( new apiresponse(200,"Playlist Founded succefully ",playlists))
})

const getplaylistbyId = asyncHandler(async(req,res)=>{
    const {playlistId} = req.params

    if(!playlistId){
      throw new apierror(400,"Playlist id require")
    }

    const playlist = await Playlist.findById(playlistId).populate("videos");

    if(!playlist){
      throw new apierror(404,"Playlist not found")
    }

    res.status(200).json( new apiresponse(200,"Playlist feactched succesully",playlist));
     
})

const removevideofromplaylist = asyncHandler(async(req,res)=>{

  const {playlistId,videoId} = req.body;

  if(!playlistId||!videoId){
    throw new apierror(400,"require fields missing")
  }

  const playlist = await Playlist.findByIdAndUpdate(playlistId,{
    $pull:{videos:videoId}
  },{
    new:true
  }).populate("videos")

  if(!playlist){
    throw new apierror(404,"Playlist Not found")
  }

  res.status(200).json(new apiresponse(200,"Video Deleted succesfully",playlist));

})

const deletePlaylist = asyncHandler(async(req,res)=>{
  const {PlaylistId} = req.params

  if(!PlaylistId){
    throw new apierror(400,"require field missing")
  }

  const deletedlist = await Playlist.findByIdAndDelete(PlaylistId)

  if(!deletedlist){
    throw new apierror(404,"Playlist not found")
  }

  res.status(200).json(new apiresponse(200,"Playlist deleted sucessfully"));

})

const updateplaylist = asyncHandler(async(req,res)=>{
  const {playlistId} = req.params
  const {name,description} = req.body

  if(!playlistId){
    throw new apierror(400,"require field missing")
  }

  if(!name?.trim() && !description?.trim()){
     throw new apierror(400,"require fields missing")
  }

  const updates = {}

  if(name?.trim()){
    updates.name = name
  }

  if(description?.trim()){
    updates.description = description
  }

  const updatedlist = await Playlist.findByIdAndUpdate(playlistId,{
   $set: updates
  },{
    new:true
  })

  if(!updatedlist){
    throw new apierror(404,"Playlist Not Found")
  }

  res.status(200).json(new apiresponse(200,"Playlist Updated sucessfully",updatedlist));

})
export { createplaylist, addvideotoplaylist,getuserplaylist,getplaylistbyId,removevideofromplaylist,deletePlaylist,updateplaylist }
