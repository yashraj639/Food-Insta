import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

const FoodPartnerProfile = () => {
  const { id } = useParams(); // food partner ID from URL
  const [partner, setPartner] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setPartner(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      })
      .catch((err) => {
        console.error("Error", err);
      });
  }, [id]);

  if (!partner) {
    return (
      <div className="flex items-center justify-center h-screen text-[var(--color-text)]">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Profile Header */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center p-7"
      >
        <h1 className="text-3xl font-bold mb-3">{partner.businessName}</h1>
        <p className="text-gray-600 mb-2">{partner.ownerName}</p>
        <p className="text-gray-500 text-sm">{partner.address}</p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-6">
          <div>
            <p className="text-lg font-semibold">{partner.totalMeals || 0}</p>
            <p className="text-sm text-gray-600">Meals</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{partner.followers || "0"}</p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{partner.following || "0"}</p>
            <p className="text-sm text-gray-600">Following</p>
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-[var(--color-border)] my-4" />

      {/* Reels Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="w-[80%] mx-auto p-4 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4"
      >
        {videos.length > 0 ? (
          videos.map((video, idx) => (
            <motion.div
              key={video._id || idx}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.4 }}
              className="relative group rounded-xl overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <video
                src={video.video}
                muted
                loop
                playsInline
                className="w-full h-48 md:h-64 object-cover"
              />
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-[var(--color-muted)]">
            No reels uploaded yet.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default FoodPartnerProfile;
