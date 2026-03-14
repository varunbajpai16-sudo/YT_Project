export default function ShortsPage() {

// ----- ALL YOUR LOGIC REMAINS THE SAME -----

return ( <div className="bg-black min-h-screen flex justify-center items-center">


  {/* SHORTS CONTAINER */}
  <div className="w-full max-w-[420px] h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">

    {shortsVideos.map((video) => {

      const videoUrl = video.videofile
        .replace("/upload/", "/upload/q_auto,f_auto,w_1280/vc_auto/")
        .replace("http://", "https://");

      return (
        <div
          key={video._id}
          className="relative w-full h-screen snap-start bg-black overflow-hidden"
        >

          {/* VIDEO */}
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />

          {/* RIGHT ACTION BAR */}
          <div className="absolute right-3 sm:right-4 bottom-24 sm:bottom-28 flex flex-col items-center gap-5 sm:gap-6 text-white">

            {/* Profile */}
            <div>
              <img
                src={video.owner?.avatar}
                alt="Profile"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover"
              />
            </div>

            {/* LIKE */}
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => likeVideo(video._id)}
            >
              <span className="text-2xl sm:text-3xl">❤️</span>
              <span className="text-xs">{likes[video._id] || 0}</span>
            </div>

            {/* COMMENTS */}
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                setShowComments(true);
                setCurrentVideo(video);
                fetchComments(video);
              }}
            >
              <span className="text-2xl sm:text-3xl">💬</span>
              <span className="text-xs">{comments?.length || 0}</span>
            </div>

            {/* SHARE */}
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl">↗</span>
              <span className="text-xs">Share</span>
            </div>

          </div>

          {/* BOTTOM INFO */}
          <div className="absolute bottom-0 w-full px-3 sm:px-4 pb-5 sm:pb-6 pt-16 sm:pt-20 bg-gradient-to-t from-black via-black/70 to-transparent text-white">

            <div className="flex items-center gap-3 mb-2">

              <span className="font-semibold text-sm">
                @{video.owner?.username}
              </span>

              <button className="bg-white text-black text-xs px-3 sm:px-4 py-1 rounded-full font-semibold hover:bg-gray-200">
                Subscribe
              </button>

            </div>

            <p className="text-xs sm:text-sm leading-snug mb-3">
              {video.description}
            </p>

          </div>

        </div>
      );
    })}

  </div>


  {/* COMMENTS POPUP */}
  {showComments && (

    <div className="fixed bottom-0 left-0 w-full md:w-[420px] md:left-1/2 md:-translate-x-1/2 h-[65%] bg-zinc-900 text-white p-4 rounded-t-2xl overflow-y-auto">

      <div className="flex justify-between mb-4">

        <h2 className="font-semibold">Comments</h2>

        <button onClick={() => setShowComments(false)}>
          ✖
        </button>

      </div>

      {/* Add Comment */}
      <div className="flex gap-2 mb-4">

        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-zinc-800 p-2 rounded outline-none text-sm"
        />

        <button
          onClick={addCommentHandler}
          className="bg-white text-black px-3 rounded text-sm"
        >
          Post
        </button>

      </div>

      {/* Comment List */}
      {comments?.map((c) => (

        <div key={c._id} className="flex gap-3 mb-4">

          <img
            src={c.owner?.avatar}
            className="w-8 h-8 rounded-full"
          />

          <div>

            <p className="text-sm font-semibold">
              {c.owner?.username}
            </p>

            <p className="text-sm text-gray-300">
              {c.content}
            </p>

          </div>

        </div>

      ))}

    </div>
  )}

</div>
```

);
}
