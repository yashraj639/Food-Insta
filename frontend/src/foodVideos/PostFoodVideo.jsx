import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;


const PostFoodVideo = () => {
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video || !name || !description) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("name", name);
    formData.append("description", description);

    try {
      setLoading(true);
      await axios.post(
        `${BASE_URL}/api/food/post-food-video`,
        formData,
        {
          withCredentials: true,
        }
      );
      navigate("/");
      toast.success("Video uploaded successfully!, Signin as a user to watch");
      setVideo(null);
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[var(--color-card)] p-6 rounded-2xl shadow-md space-y-5"
      >
        <h1 className="text-2xl font-bold text-center">Upload Food Video</h1>

        {/* Video Upload */}
        <div>
          <label className="block mb-2 font-medium">Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="w-full border border-[var(--color-border)] rounded-lg p-2 bg-[var(--color-bg-secondary)]"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block mb-2 font-medium">Video Title</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[var(--color-border)] rounded-lg p-2 bg-[var(--color-bg-secondary)]"
            placeholder="Enter video name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-[var(--color-border)] rounded-lg p-2 bg-[var(--color-bg-secondary)]"
            placeholder="Write something about your food..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-xl font-semibold hover:opacity-90 transition cursor-pointer"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-bg)",
            border: "1px solid var(--color-border)",
          }}
        >
          {loading ? "Uploading..." : "Post Video"}
        </button>
      </form>
    </div>
  );
};

export default PostFoodVideo;
