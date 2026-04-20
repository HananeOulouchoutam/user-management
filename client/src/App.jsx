import { Plus, Users } from "lucide-react";
import React from "react";
import StatsCard from "./components/StatsCard";
import SeachBar from "./components/SeachBar";
import UserTable from "./components/UserTable";
import UserModel from "./components/UserModel";

import {
  getUsers , 
  searchUsers , 
  getStats , 
  addUser ,
  updateUser ,
  deleteUser
} from './api/userAPI'


const App = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 shadow-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Users size={28} className="text-gray-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">User Management</h1>
              <p className="text-gray-400 mt-1">MERN STACK Application</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-green-500 text-gray-900 px-5 py-2.5 rounded-lg hover:bg-green-400 transition-colors shadow-lg font-semibold">
            <Plus />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 l:px-8 py-8">
        <div className="grid grid cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats */}
          <StatsCard />
        </div>

        {/* Search */}
        <SeachBar />

        {/* User Table */}
        <UserTable />


        {/* User Model */}
        {/* <UserModel /> */}
      </main>
    </div>
  );
};

export default App;
