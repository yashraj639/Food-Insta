import React from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

const FoodPartnerSignin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await axios.post(
        `${BASE_URL}/api/auth/food-partner/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("🎉 Signin successful!");

      navigate("/post-food-video");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signin failed");
    }
  };
  return (
    <AuthLayout
      title="Partner Login"
      subtitle="Access your dashboard and manage orders"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="contact@restaurant.com"
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="••••••"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold transition cursor-pointer"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-bg)",
            border: "1px solid var(--color-border)",
          }}
        >
          Sign In
        </button>
      </form>
      <p
        className="text-sm mt-4 text-center"
        style={{ color: "var(--color-muted)" }}
      >
        New partner?{" "}
        <a href="/food-partner/register" className="underline">
          Register
        </a>
      </p>
    </AuthLayout>
  );
};

export default FoodPartnerSignin;
