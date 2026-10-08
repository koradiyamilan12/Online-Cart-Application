import api from "@/lib/axios";

async function getCart() {
  const response = await api.get("/cart");
  return response.data?.data ?? { items: [], grandTotal: "0.00" };
}

async function addToCart(productId, quantity = 1) {
  const response = await api.post("/cart/items", {
    productId,
    quantity,
  });
  return response.data?.data ?? { items: [], grandTotal: "0.00" };
}

async function increaseCartItem(cartItemId) {
  const response = await api.patch(`/cart/items/${cartItemId}/increase`);
  return response.data?.data ?? { items: [], grandTotal: "0.00" };
}

async function decreaseCartItem(cartItemId) {
  const response = await api.patch(`/cart/items/${cartItemId}/decrease`);
  return response.data?.data ?? { items: [], grandTotal: "0.00" };
}

async function removeCartItem(cartItemId) {
  const response = await api.delete(`/cart/items/${cartItemId}`);
  return response.data?.data ?? { items: [], grandTotal: "0.00" };
}

export { addToCart, decreaseCartItem, getCart, increaseCartItem, removeCartItem };
export default {
  addToCart,
  decreaseCartItem,
  getCart,
  increaseCartItem,
  removeCartItem,
};
