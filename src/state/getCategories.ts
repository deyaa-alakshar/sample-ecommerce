import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CategoriesState {
  categories: string[];
  isLoading: boolean;
  error: any;
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<string[]>(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/products/categories`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: 'application/json'
        }
    });
    return response.data;

  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      state.categories.push(action.payload);
    },
    editCategory: (state, action: PayloadAction<string>) => {
      const categoryIndex = state.categories.findIndex(
        (category) => category === action.payload
      );
      if (categoryIndex !== -1) {
        state.categories[categoryIndex] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      const categoryIndex = state.categories.findIndex(
        (category) => category === action.payload
      );
      if (categoryIndex !== -1) {
        state.categories.splice(categoryIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { addCategory, editCategory, deleteCategory } = productsSlice.actions;

export default productsSlice.reducer;
