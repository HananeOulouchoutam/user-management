import { Search, X } from "lucide-react";
import React from "react";

const SeachBar = ({
  value,
  onChange,
  onClear,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  totalUsers,
}) => {
  const startUser = totalUsers === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endUser = Math.min(currentPage * itemsPerPage, totalUsers);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          placeholder="Search by name, email, phone or status..."
          className="w-full pl-10 py-2.5 bg-white border border-gray-200 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
        />

        {value && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:bg-gray-100 p-1 rounded-full transition-all"
            onClick={onClear}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Info + Select */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">
          Showing {startUser} to {endUser} of {totalUsers}
        </span>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Rows</label>

          <select
            className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            value={itemsPerPage}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SeachBar;
