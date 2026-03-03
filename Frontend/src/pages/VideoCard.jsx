import React, { useState } from "react";

const VideoCard = React.memo(({ video }) => {
  const [isHover, setIsHover] = useState(false);

  const videoUrl = video.videofile.replace("http://", "https://");

  const thumbnailUrl = video.videofile
    .replace("/upload/", "/upload/so_0,w_400,h_250,c_fill/")
    .replace(".mp4", ".jpg")
    .replace("http://", "https://");

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video mb-3">
        {isHover ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            loading="lazy"
            src={thumbnailUrl}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      <h3 className="text-sm font-semibold line-clamp-2 mb-1">
        {video.title}
      </h3>

      <p className="text-xs text-gray-400">
        {video.owner?.username}
      </p>
    </div>
  );
});

export default VideoCard;