import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SortSection = React.memo(({ video }) => {
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState(false);
  const hoverTimer = useRef(null);

  const videoUrl = video.videofile
    .replace("/upload/", "/upload/q_auto,f_auto,w_1280/vc_auto/")
    .replace("http://", "https://");

  const thumbnailUrl = video.videofile
    .replace("/upload/", "/upload/so_0,w_400,h_250,c_fill/")
    .replace(".mp4", ".jpg")
    .replace("http://", "https://");

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setIsHover(true);
    }, 500); // 0.5 sec delay
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    setIsHover(false);
  };

  return (
    <div className="group cursor-pointer w-full">
      <div
        className="relative bg-gray-800 rounded-lg overflow-hidden w-full aspect-[9/16] mb-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate("/sorts", { state: { video } })}
      >
        {isHover ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <img
            loading="lazy"
              src={video.thumbnail||thumbnailUrl}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300"></div>
      </div>

      <h3 className="text-sm font-semibold line-clamp-2 mb-1">{video.title}</h3>

      <p className="text-xs text-gray-400">{video.owner?.username}</p>
    </div>
  );
});

export default SortSection;
