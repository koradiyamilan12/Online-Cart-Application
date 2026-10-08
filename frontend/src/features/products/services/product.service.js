import api from "@/lib/axios";

async function getProducts() {
  const response = await api.get("/products");
  return response.data?.data ?? [];
}

export { getProducts };
export default {
  getProducts,
};
