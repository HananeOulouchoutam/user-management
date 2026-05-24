import React from "react";
import { X, Check } from "lucide-react";

const UserModel = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  loading,
  status,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {formData._id ? "Edit User" : "Add New User"}
          </h2>

          <button
            className="text-gray-400 hover:text-gray-600 transition"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Phone *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="0700000000"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Status *
              </label>

              <select
                className="w-full px-4 py-2.5 bg-white border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                {status.map((s, index) => (
                  <option key={index} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              className="flex-1 px-4 py-2.5 bg-gray-100 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50"
              onClick={onSubmit}
              disabled={loading}
            >
              <Check size={18} />

              {loading
                ? "Saving..."
                : formData._id
                  ? "Update User"
                  : "Add User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModel;
