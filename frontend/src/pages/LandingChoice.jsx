import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { Handshake } from "lucide-react";

const LandingChoice = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg rounded-2xl shadow-lg p-10 text-center"
        style={{
          backgroundColor: "var(--color-card)",
          border: "1px solid var(--color-border)",
        }}
      >
        <h1 className="text-3xl font-bold mb-3">Welcome to BingeBites</h1>
        <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>
          Choose how you'd like to get started
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Card */}
          <Link to="/user/register">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 rounded-xl cursor-pointer shadow-md"
              style={{
                backgroundColor: "var(--color-bg)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="div flex items-center justify-center">
                <h2 className="text-xl font-semibold mb-2">
                  I'm a User{" "}
                  <User
                    className="inline-block"
                    style={{ color: "#fff" }}
                    size={20}
                  />
                </h2>
              </div>
              <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                Order food, explore menus, and enjoy meals
              </p>
            </motion.div>
          </Link>

          {/* Food Partner Card */}
          <Link to="/food-partner/register">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 rounded-xl cursor-pointer shadow-md"
              style={{
                backgroundColor: "var(--color-bg)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="div flex items-center justify-center">
                <h2 className="text-xl font-semibold mb-2">
                  I'm a Partner
                  <Handshake
                    className="inline-block ml-1"
                    style={{ color: "#fff" }}
                    size={20}
                  />
                </h2>
              </div>
              <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                Register your restaurant and grow with us
              </p>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingChoice;
