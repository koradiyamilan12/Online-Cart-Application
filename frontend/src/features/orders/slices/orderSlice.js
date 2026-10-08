import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "@/features/orders/services/orderService";
import { getErrorMessage } from "@/lib/utils";

const initialState = {
  orders: [],
  currentOrder: null,
  isLoadingOrders: false,
  isLoadingOrder: false,
  isSubmitting: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await orderService.getOrders();
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to load your orders."),
      );
    }
  },
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      return await orderService.getOrder(orderId);
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to load this order."),
      );
    }
  },
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (_, { rejectWithValue }) => {
    try {
      return await orderService.createOrder();
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to place your order."),
      );
    }
  },
  {
    condition: (_, { getState }) => !getState().orders.isSubmitting,
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoadingOrders = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoadingOrders = false;
        state.orders = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoadingOrders = false;
        state.orders = [];
        state.error = action.payload || "Unable to load your orders.";
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoadingOrder = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoadingOrder = false;
        state.currentOrder = action.payload ?? null;
        state.error = null;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoadingOrder = false;
        state.currentOrder = null;
        state.error = action.payload || "Unable to load this order.";
      })
      .addCase(createOrder.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isSubmitting = false;
        const nextOrder = action.payload ?? null;
        state.currentOrder = nextOrder;
        state.error = null;

        if (nextOrder && nextOrder.id) {
          state.orders = [
            nextOrder,
            ...state.orders.filter(
              (order) => String(order.id) !== String(nextOrder.id),
            ),
          ];
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload || "Unable to place your order.";
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export const selectOrdersState = (state) => state.orders;
export default orderSlice.reducer;
