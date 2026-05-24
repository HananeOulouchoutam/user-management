import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import React from "react";

const UserTable = ({
  users,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* HEADER */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Name", "Email", "Phone", "Status", "Created", "Action"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {u.name}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>

                <td className="px-6 py-4 text-sm text-gray-600">{u.phone}</td>

                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.status === "Active"
                        ? "bg-green-50 text-green-600 border border-green-100"
                        : "bg-red-50 text-red-600 border border-red-100"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(u)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-50 text-green-600 border border-green-100 rounded-lg hover:bg-green-100 transition"
                    >
                      <Edit size={16} /> Edit
                    </button>

                    <button
                      onClick={() => onDelete(u._id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* EMPTY STATE */}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-12 text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {users.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft size={16} /> Prev
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const p = i + 1;

              if (
                p === 1 ||
                p === totalPages ||
                (p >= currentPage - 1 && p <= currentPage + 1)
              ) {
                return (
                  <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`px-3 py-2 rounded-lg border text-sm ${
                      currentPage === p
                        ? "bg-green-50 text-green-600 border-green-200 font-semibold"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                );
              }

              if (p === currentPage - 2 || p === currentPage + 2) {
                return (
                  <span key={p} className="px-2 py-2 text-gray-400">
                    ...
                  </span>
                );
              }

              return null;
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight size={16} /> Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
