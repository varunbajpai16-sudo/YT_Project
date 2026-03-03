import asynchandler from '../utils/asynchandler.uitls.js'
import { Subscription }from '../models/subscription.models.js'
import apiresponse from '../utils/apiresponse.utils.js'

const toggleSubscription = asynchandler(async (req, res) => {
  const channelId = req.params.channelId
  const userId = req.user._id
  if (!channelId) {
    return res
      .status(400)
      .json(new apiresponse(400, 'Channel ID is required', null))
  }
  
  if (channelId.toString() === userId.toString()) {
  return res.status(400).json(
    new apiresponse(400, "You cannot subscribe to yourself", null)
  )
}

  const existinguser = await Subscription.findOne({
    channel: channelId,
    subscriber: userId,
  })

  if (existinguser) {
    await Subscription.findOneAndDelete({ _id: existinguser._id })
    console.log('Unsubscribed successfully')
    return res
      .status(200)
      .json(new apiresponse(200, 'Unsubscribed successfully', null))
  }

  const subscription = await Subscription.create({
    channel: channelId,
    subscriber: userId,
  })

  res
    .status(201)
    .json(new apiresponse(201, 'Subscribed successfully', subscription))
})

export { toggleSubscription }
