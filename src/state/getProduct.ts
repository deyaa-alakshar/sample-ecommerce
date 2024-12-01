import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductState {
  product?: Product;
  isLoading: boolean;
  error: any;
}

const initialState: ProductState = {
  isLoading: false,
  error: null,
};

export const fetchProduct = createAsyncThunk<Product, string>(
  "product/fetchProduct",
  async (category: string) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/products/${category}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: 'application/json'
        }
    });
    return response.data;

  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
