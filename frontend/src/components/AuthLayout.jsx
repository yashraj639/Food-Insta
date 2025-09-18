import React from "react";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl shadow-lg p-8"
        style={{
          backgroundColor: "var(--color-card)",
          color: "var(--color-text)",
          border: "1px solid var(--color-border)",
        }}
      >
        <h2 className="text-3xl font-bold mb-2 text-center">{title}</h2>
        {subtitle && (
          <p
            className="text-sm text-center mb-6"
            style={{ color: "var(--color-muted)" }}
          >
            {subtitle}
          </p>
        )}
        {children}
        <ToastContainer position="top-center" autoClose={3000} />
      </motion.div>
    </div>
  );
};

export default AuthLayout;
