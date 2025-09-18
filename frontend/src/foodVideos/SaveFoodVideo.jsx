import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Home, Heart, MessageCircle, Bookmark } from "lucide-react";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

const SaveFoodVideo = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  // Fetch saved videos
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/food/saved-videos`, {
        withCredentials: true,
      })
      .then((res) => setVideos(res.data.videos || []))
      .catch((err) =>
        console.error("Error fetching saved videos:", err.response?.data || err)
      );
  }, []);

  // Auto-pause logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) video.play();
          else video.pause();
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videos]);

  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {videos.map((video, idx) => (
        <div
          key={video._id || idx}
          className="relative h-screen w-full snap-start flex items-center justify-center"
        >
          {/* Video */}
          <div className="relative h-full w-full md:w-[420px] lg:w-[480px] flex items-center justify-center">
            <video
              ref={(el) => (videoRefs.current[idx] = el)}
              src={video.video}
              loop
              muted
              playsInline
              className="h-full w-full object-cover rounded-md"
            />

            {/* Overlay */}
            <div className="absolute bottom-20 left-0 right-0 px-4 text-center">
              <p className="text-white md:text-base mb-3 line-clamp-2">
                {video.name}
              </p>
              <p className="text-white text-sm md:text-base mb-3 line-clamp-2">
                {video.description}
              </p>
              <Link
                to={"/food-partner/" + video.foodPartner}
                className="inline-block bg-[var(--color-primary)] text-[var(--color-bg)] px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold shadow-lg"
              >
                Visit Store
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="absolute right-4 bottom-50 flex flex-col gap-6 items-center">
              {/* Like count display */}
              <div className="flex flex-col items-center">
                <Heart className="w-8 h-8 text-red-500" fill="red" />
                <span className="text-white text-sm">
                  {video.likeCount || 0}
                </span>
              </div>

              {/* Comment button (future modal) */}
              <button>
                <MessageCircle className="w-8 h-8 text-white hover:text-[var(--color-primary)] transition" />
              </button>

              {/* Saved state (always saved here) */}
              <div className="flex flex-col items-center">
                <Bookmark
                  className="w-8 h-8 text-[var(--color-primary)]"
                  fill="var(--color-primary)"
                />
                <span className="text-white text-sm">
                  {video.saveCount || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/40 border-t border-[var(--color-border)] flex justify-around py-3">
        <Link
          to="/watch-food-video"
          className="flex flex-col items-center text-white"
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/save-video"
          className="flex flex-col items-center text-white"
        >
          <Bookmark className="w-6 h-6 text-[var(--color-primary)]" />
          <span className="text-xs mt-1">Saved</span>
        </Link>
      </div>
    </div>
  );
};

export default SaveFoodVideo;
