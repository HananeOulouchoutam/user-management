import { Plus, User, Users, Users2, Check, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import StatsCard from "./components/StatsCard";
import SeachBar from "./components/SeachBar";
import UserTable from "./components/UserTable";
import UserModel from "./components/UserModel.jsx";

import {
  getUsers,
  searchUsers,
  getStats,
  addUser,
  updateUser,
  deleteUser,
} from "./api/userAPI";

const App = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
  });

  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerpage, setItemsPerpage] = useState(5);
  const [totalPages, setTotalPages] = useState(5);

  const status = ["Active", "Inactive"];

  // why we used state here
  const [totalUsers, setTotalUsers] = useState(0);

  //fetch stats
  const fetchStats = async () => {
    const data = await getStats();
    setStats(data);
  };

  //fetch users
  const fetchUsers = async (currentPage, itemsPerpage) => {
    try {
      const data = await getUsers(currentPage, itemsPerpage);
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalUsers(data.totalUsers);
      await fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  //search users
  const handleSearch = async (searchTerm, currentPage, itemsPerpage) => {
    try {
      const data = await searchUsers(searchTerm, currentPage, itemsPerpage);

      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalUsers(data.totalUsers);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      if (editingItem) {
        await updateUser(editingItem._id, formData);
      } else {
        await addUser(formData);
      }

      await fetchUsers();
      setIsModelOpen((prev) => !prev);
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete user");
    }
  };

  const openModel = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ name: "", email: "", phone: "", status: "Active" });
    }
    setIsModelOpen(true);
  };

  const closeMode = () => {
    setIsModelOpen(false);
    setEditingItem(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      status: "Active",
    });
  };

  //use Effect
  useEffect(() => {
    const loadData = async () => {
      if (searchTerm) {
        await handleSearch(searchTerm, currentPage, itemsPerpage);
      } else {
        await fetchUsers(currentPage, itemsPerpage);
      }
    };

    loadData();
  }, [searchTerm, currentPage, itemsPerpage]);

  console.log("Search Item :", searchTerm);
  return (
    <div className="min-h-screen bg-white-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-white via-gray-50 to-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-5 flex justify-between items-center">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 border border-green-200 rounded-xl">
              <Users size={26} className="text-green-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
                User Management
              </h1>
              <p className="text-sm text-gray-500">
                MERN STACK Application Dashboard
              </p>
            </div>
          </div>

          {/* Right side button */}
          <button
            onClick={() => openModel()}
            className="group flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-green-600 hover:shadow-green-200 transition-all duration-300"
          >
            <Plus className="group-hover:rotate-90 transition-transform duration-300" />
            Add User
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 l:px-8 py-8">
        <div className="grid grid cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats */}
          <StatsCard
            title="Total Users"
            value={{ number: stats.total }}
            icon={<Users2 />}
            color="indigo"
          />

          <StatsCard
            title="Active Users"
            value={{ number: stats.active }}
            icon={<Check />}
            color="green"
          />

          <StatsCard
            title="Inactive Users"
            value={{ number: stats.inactive }}
            icon={<X />}
            color="red"
          />
        </div>

        {/* Search */}
        <SeachBar
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val);
            setCurrentPage(1);
          }}
          onClear={() => {
            setSearchTerm("");
            setCurrentPage(1);
          }}
          itemsPerPage={itemsPerpage}
          onItemsPerPageChange={(val) => {
            setItemsPerpage(Number(val));
            setCurrentPage(1);
          }}
          currentPage={currentPage}
          totalUsers={totalUsers}
        />

        {/* User Table */}
        <UserTable
          users={users}
          onEdit={openModel}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* User Model */}
        <UserModel
          isOpen={isModelOpen}
          onClose={closeMode}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          loading={loading}
          status={status}
        />
      </main>
    </div>
  );
};

export default App;
