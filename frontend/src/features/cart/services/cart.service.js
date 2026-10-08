import api from "@/lib/axios";

function requireCart(data) {
  if (!data || !Array.isArray(data.items) || data.grandTotal == null) {
    throw new Error("The cart API returned an invalid cart response.");
  }

  return data;
}

async function getCart() {
  const response = await api.get("/cart");
  return requireCart(response.data?.data);
}

async function addToCart(productId, quantity = 1) {
  const response = await api.post("/cart/items", {
    productId,
    quantity,
  });
  return requireCart(response.data?.data);
}

async function increaseCartItem(cartItemId) {
  const response = await api.patch(`/cart/items/${cartItemId}/increase`);
  return requireCart(response.data?.data);
}

async function decreaseCartItem(cartItemId) {
  const response = await api.patch(`/cart/items/${cartItemId}/decrease`);
  return requireCart(response.data?.data);
}

async function removeCartItem(cartItemId) {
  const response = await api.delete(`/cart/items/${cartItemId}`);
  return requireCart(response.data?.data);
}

export { addToCart, decreaseCartItem, getCart, increaseCartItem, removeCartItem };
export default {
  addToCart,
  decreaseCartItem,
  getCart,
  increaseCartItem,
  removeCartItem,
};
