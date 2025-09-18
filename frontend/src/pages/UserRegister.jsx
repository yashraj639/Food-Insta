import React from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

const UserRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await axios.post(
        `${BASE_URL}/api/auth/user/register`,
        {
          firstName: fullName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("🎉 Registered successfully!");
      navigate("/watch-food-video");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };
  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join as a User to explore and order food"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input id="fullName" label="Full Name" placeholder="John Doe" />
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
        <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
          Password must be at least 6 characters.
        </p>
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold transition cursor-pointer"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-bg)",
            border: "1px solid var(--color-border)",
          }}
        >
          Register
        </button>
      </form>
      <p
        className="text-sm mt-4 text-center"
        style={{ color: "var(--color-muted)" }}
      >
        Already have an account?
        <a href="/user/signin" className="underline">
          Sign in
        </a>
      </p>
    </AuthLayout>
  );
};

export default UserRegister;
