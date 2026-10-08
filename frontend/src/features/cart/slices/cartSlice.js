import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "@/lib/utils";
import cartService from "@/features/cart/services/cart.service";

const initialState = {
  cart: null,
  items: [],
  totalItems: 0,
  grandTotal: "0.00",
  isLoading: false,
  isMutating: false,
  mutatingItemId: null,
  pendingProductId: null,
  error: null,
};

function normalizeCart(cartPayload) {
  const safeCart = cartPayload && typeof cartPayload === "object" ? cartPayload : {};
  const items = Array.isArray(safeCart.items) ? safeCart.items : [];

  return {
    cart: safeCart,
    items,
    totalItems: items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),
    grandTotal: safeCart.grandTotal ?? "0.00",
  };
}

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const cart = await cartService.getCart();
    return cart;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Unable to load your cart."));
  }
});

export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity = 1 }, { rejectWithValue }) => {
  try {
    const cart = await cartService.addToCart(productId, quantity);
    return cart;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Unable to add product to your cart."));
  }
});

export const increaseCartItem = createAsyncThunk("cart/increaseCartItem", async (cartItemId, { rejectWithValue }) => {
  try {
    const cart = await cartService.increaseCartItem(cartItemId);
    return cart;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Unable to update your cart."));
  }
});

export const decreaseCartItem = createAsyncThunk("cart/decreaseCartItem", async (cartItemId, { rejectWithValue }) => {
  try {
    const cart = await cartService.decreaseCartItem(cartItemId);
    return cart;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Unable to update your cart."));
  }
});

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (cartItemId, { rejectWithValue }) => {
  try {
    const cart = await cartService.removeCartItem(cartItemId);
    return cart;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Unable to remove item from your cart."));
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.cart = null;
      state.items = [];
      state.totalItems = 0;
      state.grandTotal = "0.00";
      state.isLoading = false;
      state.isMutating = false;
      state.mutatingItemId = null;
      state.pendingProductId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        const nextCart = normalizeCart(action.payload);
        state.cart = nextCart.cart;
        state.items = nextCart.items;
        state.totalItems = nextCart.totalItems;
        state.grandTotal = nextCart.grandTotal;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.items = [];
        state.totalItems = 0;
        state.grandTotal = "0.00";
        state.error = action.payload || "Unable to load your cart.";
      })
      .addCase(addToCart.pending, (state, action) => {
        state.isMutating = true;
        state.pendingProductId = action.meta.arg?.productId ?? null;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const nextCart = normalizeCart(action.payload);
        state.cart = nextCart.cart;
        state.items = nextCart.items;
        state.totalItems = nextCart.totalItems;
        state.grandTotal = nextCart.grandTotal;
        state.isMutating = false;
        state.pendingProductId = null;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isMutating = false;
        state.pendingProductId = null;
        state.error = action.payload || "Unable to add product to your cart.";
      })
      .addCase(increaseCartItem.pending, (state, action) => {
        state.isMutating = true;
        state.mutatingItemId = action.meta.arg ?? null;
        state.error = null;
      })
      .addCase(increaseCartItem.fulfilled, (state, action) => {
        const nextCart = normalizeCart(action.payload);
        state.cart = nextCart.cart;
        state.items = nextCart.items;
        state.totalItems = nextCart.totalItems;
        state.grandTotal = nextCart.grandTotal;
        state.isMutating = false;
        state.mutatingItemId = null;
        state.error = null;
      })
      .addCase(increaseCartItem.rejected, (state, action) => {
        state.isMutating = false;
        state.mutatingItemId = null;
        state.error = action.payload || "Unable to update your cart.";
      })
      .addCase(decreaseCartItem.pending, (state, action) => {
        state.isMutating = true;
        state.mutatingItemId = action.meta.arg ?? null;
        state.error = null;
      })
      .addCase(decreaseCartItem.fulfilled, (state, action) => {
        const nextCart = normalizeCart(action.payload);
        state.cart = nextCart.cart;
        state.items = nextCart.items;
        state.totalItems = nextCart.totalItems;
        state.grandTotal = nextCart.grandTotal;
        state.isMutating = false;
        state.mutatingItemId = null;
        state.error = null;
      })
      .addCase(decreaseCartItem.rejected, (state, action) => {
        state.isMutating = false;
        state.mutatingItemId = null;
        state.error = action.payload || "Unable to update your cart.";
      })
      .addCase(removeCartItem.pending, (state, action) => {
        state.isMutating = true;
        state.mutatingItemId = action.meta.arg ?? null;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const nextCart = normalizeCart(action.payload);
        state.cart = nextCart.cart;
        state.items = nextCart.items;
        state.totalItems = nextCart.totalItems;
        state.grandTotal = nextCart.grandTotal;
        state.isMutating = false;
        state.mutatingItemId = null;
        state.error = null;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isMutating = false;
        state.mutatingItemId = null;
        state.error = action.payload || "Unable to remove item from your cart.";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export const selectCartState = (state) => state.cart;
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) => state.cart.totalItems;
export const selectCartGrandTotal = (state) => state.cart.grandTotal;
export default cartSlice.reducer;
