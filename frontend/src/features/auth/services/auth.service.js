import api from "@/lib/axios";

async function registerUser(payload) {
  const response = await api.post("/auth/register", payload);
  return response.data?.data?.user ?? null;
}

async function loginUser(payload) {
  const response = await api.post("/auth/login", payload);
  return response.data?.data?.user ?? null;
}

async function logoutUser() {
  const response = await api.post("/auth/logout");
  return response.data?.message ?? "Logout successful";
}

async function getCurrentUser() {
  const response = await api.get("/auth/profile");
  return response.data?.data?.user ?? null;
}

export { getCurrentUser, loginUser, logoutUser, registerUser };
export default {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
};
