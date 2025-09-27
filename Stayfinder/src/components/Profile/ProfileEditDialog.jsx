import React, { useState } from "react";
import { Camera, Save, X } from "lucide-react";
import { profileAPI } from '../../api';

export const ProfileEditDialog = ({ user, open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.username || user.name,
    email: user.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      
      // Only include fields that are not empty
      const updatePayload = {};
      if (formData.name && formData.name.trim() !== '') {
        updatePayload.username = formData.name.trim();
      }
      if (formData.email && formData.email.trim() !== '') {
        updatePayload.email = formData.email.trim();
      }

      // If no fields to update, show message
      if (Object.keys(updatePayload).length === 0) {
        alert("Please enter at least one field to update");
        setLoading(false);
        return;
      }

      console.log('Sending update payload:', updatePayload);
      const response = await profileAPI.updateProfile(userId, updatePayload);
      
      if (response.status === 200) {
        // Update user object with only the fields that were changed
        const updatedUser = { ...user };
        if (updatePayload.username) {
          updatedUser.username = updatePayload.username;
        }
        if (updatePayload.email) {
          updatedUser.email = updatePayload.email;
        }
        
        onSave(updatedUser);
        alert("Profile updated successfully!");
        onClose();
      }
    } catch (err) {
      console.error('Profile update error:', err);
      
      // Handle specific error messages
      if (err.response && err.response.data && err.response.data.details) {
        const errorDetails = err.response.data.details;
        if (errorDetails.includes('E11000') && errorDetails.includes('email')) {
          alert("This email address is already taken. Please use a different email.");
        } else {
          alert(`Update failed: ${err.response.data.message || 'Something went wrong'}`);
        }
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
        <p className="text-sm text-gray-600 mb-6">Update only the fields you want to change</p>
        <button
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100 text-lg">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username || user.name} className="w-full h-full object-cover" />
                ) : (
                  (user.username || user.name || 'U').charAt(0).toUpperCase()
                )}
              </div>
              <button
                type="button"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
              >
                <Camera size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-500">Click to change avatar</p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
              />
            </div>

            {/* Password */}
            <div className="pt-4 border-t border-gray-300">
              <h4 className="font-medium text-gray-700 mb-3">Change Password</h4>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => handleChange("currentPassword", e.target.value)}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => handleChange("newPassword", e.target.value)}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 rounded p-2 flex items-center justify-center hover:bg-gray-100"
            >
              <X size={16} className="mr-2" /> Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white rounded p-2 flex items-center justify-center hover:bg-blue-700"
            >
              <Save size={16} className="mr-2" /> {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
