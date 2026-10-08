import api from "@/lib/axios";

function requireOrder(data) {
  if (
    !data
    || (typeof data.id !== "number" && typeof data.id !== "string")
    || !Array.isArray(data.items)
    || data.totalAmount == null
  ) {
    throw new Error("The orders API returned an invalid order response.");
  }

  return data;
}

async function createOrder() {
  const response = await api.post("/orders");
  return requireOrder(response.data?.data);
}

async function getOrders() {
  const response = await api.get("/orders");
  const orders = response.data?.data;

  if (!Array.isArray(orders)) {
    throw new Error("The orders API returned an invalid order list.");
  }

  return orders;
}

async function getOrder(orderId) {
  const response = await api.get(`/orders/${orderId}`);
  return requireOrder(response.data?.data);
}

export { createOrder, getOrder, getOrders };
export default {
  createOrder,
  getOrder,
  getOrders,
};
