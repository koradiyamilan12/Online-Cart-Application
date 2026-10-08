import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "@/lib/utils";
import productService from "@/features/products/services/product.service";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const products = await productService.getProducts();
    return Array.isArray(products) ? products : [];
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Unable to load products."));
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.items = [];
        state.status = "failed";
        state.error = action.payload || "Unable to load products.";
      });
  },
});

export const selectProductsState = (state) => state.products;
export const selectProductList = (state) => state.products.items;
export default productSlice.reducer;
