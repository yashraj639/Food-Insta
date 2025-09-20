import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Home, Heart, MessageCircle, Bookmark, LogOut, Play, Pause } from "lucide-react"; // Import Play/Pause icons

const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

const WatchFoodVideo = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  // Add a state to track which video is manually paused by the user
  const [manuallyPaused, setManuallyPaused] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/food/watch-food-video`, {
        withCredentials: true,
      })
      .then((response) => {
        setVideos(response.data.foodItems || []);
      })
      .catch(() => {});
  }, []);

  // Function to handle video click (play/pause)
  const handleVideoClick = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    // Toggle play/pause on click
    if (video.paused) {
      video.play().catch(error => console.log("Play failed:", error));
      setManuallyPaused(null); // Clear the manual pause state
    } else {
      video.pause();
      setManuallyPaused(index); // Remember that this video was manually paused
    }
  };

  // Auto-play/pause logic with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          // Find the index of the video being observed
          const index = videoRefs.current.indexOf(video);
          
          if (entry.isIntersecting) {
            // Only play if this video wasn't manually paused by the user
            if (manuallyPaused !== index) {
              video.play().catch(error => {
                // This error is expected on some mobile browsers without a user gesture.
                // We can ignore it or show a "tap to play" icon.
                console.log("Autoplay prevented. User gesture required.");
              });
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.7 } // Play when 70% of the video is in view
    );

    // Observe all current videos
    const currentVideos = videoRefs.current;
    currentVideos.forEach((video) => {
      if (video) observer.observe(video);
    });

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [videos, manuallyPaused]); // Re-run if videos or manual pause state changes

  // Like toggle
  async function likeVideo(video, index, e) {
    e.stopPropagation(); // Crucial: Prevent triggering the video play/pause
    try {
      const response = await axios.post(
        `${BASE_URL}/api/food/like-video`,
        { foodId: video._id },
        { withCredentials: true }
      );

      const { isLiked, likeCount } = response.data;

      setVideos((prev) =>
        prev.map((v, i) => (i === index ? { ...v, isLiked, likeCount } : v))
      );
    } catch (err) {
      console.error("Like error:", err.response?.data || err.message);
    }
  }

  // Save toggle
  const handleSave = async (video, index, e) => {
    e.stopPropagation(); // Crucial: Prevent triggering the video play/pause
    try {
      const res = await axios.post(
        `${BASE_URL}/api/food/save-video`,
        { foodId: video._id },
        { withCredentials: true }
      );

      const { isSaved, saveCount } = res.data;

      setVideos((prev) =>
        prev.map((v, i) => (i === index ? { ...v, isSaved, saveCount } : v))
      );
    } catch (err) {
      console.error("Save error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {videos.map((video, idx) => {
        const isPaused = videoRefs.current[idx]?.paused;
        return (
          <div
            key={video._id || idx}
            className="relative h-screen w-full snap-start flex items-center justify-center"
          >
            {/* Video Container - NOW CLICKABLE */}
            <div
              className="relative h-full w-full md:w-[420px] lg:w-[480px] flex items-center justify-center"
              onClick={() => handleVideoClick(idx)} // Add click handler here
            >
              <video
                ref={(el) => (videoRefs.current[idx] = el)}
                src={video.video}
                loop
                muted
                playsInline
                // REMOVED: controls 
                className="h-full w-full object-cover rounded-md"
              />

              {/* Optional: Show a play icon if the video is paused */}
              {isPaused && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-16 h-16 text-white opacity-70" />
                </div>
              )}

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
                  onClick={(e) => e.stopPropagation()} // Prevent video play/pause
                >
                  Visit Store
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="absolute right-4 bottom-50 flex flex-col gap-6 items-center">
                {/* Like */}
                <button onClick={(e) => likeVideo(video, idx, e)}>
                  <Heart
                    className={`w-8 h-8 transition ${
                      video.isLiked ? "text-red-500" : "text-white"
                    }`}
                    fill={video.isLiked ? "red" : "none"}
                  />
                  <span className="text-white text-sm">
                    {video.likeCount ?? video.likesCount ?? video.likes ?? 0}
                  </span>
                </button>

                {/* Comment */}
                <button onClick={(e) => e.stopPropagation()}>
                  <MessageCircle className="w-8 h-8 text-white hover:text-[var(--color-primary)] transition" />
                </button>

                {/* Save */}
                <button onClick={(e) => handleSave(video, idx, e)}>
                  <Bookmark
                    className={`w-8 h-8 transition ${
                      video.isSaved ? "text-[var(--color-primary)]" : "text-white"
                    }`}
                    fill={video.isSaved ? "var(--color-primary)" : "none"}
                  />
                  <span className="text-white text-sm">
                    {video.saveCount ?? video.savedCount ?? video.saveCount ?? 0}
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom Navbar (unchanged) */}
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
          <Bookmark className="w-6 h-6" />
          <span className="text-xs mt-1">Saved</span>
        </Link>
        <Link to="/" className="flex flex-col items-center text-white">
          <LogOut className="w-6 h-6" />
          <span className="text-xs mt-1">Sign out</span>
        </Link>
      </div>
    </div>
  );
};

export default WatchFoodVideo;