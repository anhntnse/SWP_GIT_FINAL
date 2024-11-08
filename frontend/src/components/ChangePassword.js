import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import SummaryApi from "../common";

const ChangePassword = ({ userData }) => {
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    userId: userData?._id || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      userId: userData?._id || "",
    });
  }, [userData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    if (!formData.userId) {
      toast.error("User ID is missing");
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    setIsSubmitting(true); // Set loading state

    try {
      const response = await fetch(SummaryApi.changePassword.url, {
        method: SummaryApi.changePassword.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message || "Failed to change password");
      }
    } catch (error) {
      toast.error("Error changing password");
      console.error("Password change error:", error);
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className="top-10 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-100 bg-opacity-70">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <div className="text-center pb-4">
          <h2 className="font-bold text-2xl text-gray-800">Change Password</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-700">Current Password:</label>
            <div className="relative">
              <input
                type={showPassword.currentPassword ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                placeholder="Enter current password"
                value={formData.currentPassword}
                onChange={handleOnChange}
                className="w-full px-4 py-2 mt-2 bg-slate-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => togglePasswordVisibility("currentPassword")}
              >
                {showPassword.currentPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeOffIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700">New Password:</label>
            <div className="relative">
              <input
                type={showPassword.newPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleOnChange}
                className="w-full px-4 py-2 mt-2 bg-slate-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                {showPassword.newPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeOffIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-semibold text-gray-700">Confirm New Password:</label>
            <div className="relative">
              <input
                type={showPassword.confirmNewPassword ? "text" : "password"}
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="Confirm new password"
                value={formData.confirmNewPassword}
                onChange={handleOnChange}
                className="w-full px-4 py-2 mt-2 bg-slate-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => togglePasswordVisibility("confirmNewPassword")}
              >
                {showPassword.confirmNewPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeOffIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 mt-6 text-white bg-indigo-600 rounded-lg focus:outline-none hover:bg-indigo-700 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
