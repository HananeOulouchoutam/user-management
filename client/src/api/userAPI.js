const API_URL = "http://localhost:5000/api/v1/users";

//get users with pagination
export const getUsers = async (page = 1, limit = 5) => {
  const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

//search users
export const searchUsers = async (term = "", page = 1, limit = 5) => {
  const res = await fetch(
    `${API_URL}/seach/${encodeURIComponent(term)}?page=${page}&limit=${limit}`,
  );
  if (!res.ok) throw new Error("Failed to search users");
  return res.json();
};

//get Stats
export const getStats = async () => {
  const res = await fetch(`${API_URL}/stats`);
  if (!res.ok) throw new Error("Failed to fetch Stats");
  return res.json();
};

//add new user
export const addUser = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to add New User");

  return res.json();
};

// update existing user
export const updateUser = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    methode: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update User");
  return res.json();
};

//deleteUser

export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    methode: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete User");
  return res.json();
};
