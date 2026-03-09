import React, { memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const SidebarVideoCard = memo(({ video }) => {
  const navigate = useNavigate();

  const thumbnailUrl = useMemo(() => {
    return video.videofile
      .replace("/upload/", "/upload/q_auto,f_auto/")
      .replace(".mp4", ".jpg")
      .replace("http://", "https://");
  }, [video.videofile]);

  const duration = useMemo(() => {
    const mins = Math.floor(video.duration / 60);
    const secs = Math.floor(video.duration % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, [video.duration]);

  const handleClick = useCallback(() => {
    navigate("/watch", { state: { video } });
  }, [navigate, video]);

  return (
    <div
      onClick={handleClick}
      className="flex gap-3 cursor-pointer group hover:bg-zinc-900 p-1 rounded-lg"
    >
      {/* Thumbnail */}
      <div className="relative min-w-[168px] h-[94px] rounded-lg overflow-hidden">
        <img
          loading="lazy"
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover"
        />

        <span className="absolute bottom-1 right-1 bg-black/80 text-xs px-1 rounded">
          {duration}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col text-sm">
        <p className="font-medium text-white line-clamp-2">
          {video.title}
        </p>

        <p className="text-gray-400 text-xs mt-1">
          {video.owner?.username}
        </p>

        <p className="text-gray-400 text-xs">
          {video.views} views
        </p>
      </div>
    </div>
  );
});

export default SidebarVideoCard;