import React from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ownerName = e.target.ownerName.value;
    const businessName = e.target.businessName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const phoneNumber = e.target.phoneNumber.value;
    const address = e.target.address.value;

    try {
      const result = await axios.post(
        `${BASE_URL}/api/auth/food-partner/register`,
        {
          ownerName,
          businessName,
          phoneNumber,
          email,
          password,
          address,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("🎉 Registered successfully!");
      navigate("/post-food-video");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };
  return (
    <AuthLayout
      title="Partner With Us"
      subtitle="Register your restaurant and grow with us"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          id="businessName"
          label="Business Name"
          placeholder="Pizza Palace"
        />

        {/* Side by side row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input id="ownerName" label="Owner Name" placeholder="John Doe" />
          <Input
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            placeholder="+91 98765 43210"
          />
        </div>

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
        <Input
          id="address"
          label="Address"
          placeholder="123 Street, City, ZIP"
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
        Already a partner?{" "}
        <a href="/food-partner/signin" className="underline">
          Sign in
        </a>
      </p>
    </AuthLayout>
  );
};

export default FoodPartnerRegister;
