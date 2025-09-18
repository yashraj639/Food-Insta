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
        className="bg-[var(--color-card)] rounded-b-3xl shadow-lg p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          {/* Info */}
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-bold py-1"
            >
              {partner.businessName}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-sm py-1"
            >
              Owned by {partner.ownerName}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm mt-1"
            >
              {partner.address}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
              className="flex gap-6 mt-4"
            >
              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
                <p className="text-sm text-[var(--color-muted)]">Total Meals</p>
                <p className="text-lg font-semibold">
                  {partner.totalMeals || 0}
                </p>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
                <p className="text-sm text-[var(--color-muted)]">Customers</p>
                <p className="text-lg font-semibold">
                  {partner.customersServed || 0}
                </p>
              </motion.div>
            </motion.div>
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
        className="p-4 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4"
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
              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center transition"
              >
                <span className="text-white font-semibold">View Reel</span>
              </motion.div>
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
