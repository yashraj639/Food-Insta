import React from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;


const UserSignin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await axios.post(
        `${BASE_URL}/api/auth/user/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("🎉 Signin successful!");
      navigate("/watch-food-video");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signin failed");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your food journey"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
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
        New here?{" "}
        <a href="/user/register" className="underline">
          Create an account
        </a>
      </p>
    </AuthLayout>
  );
};

export default UserSignin;
