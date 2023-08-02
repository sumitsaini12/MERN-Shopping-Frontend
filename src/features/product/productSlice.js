import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductsByFilters,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  createProduct,
  updateProduct,
} from "./productAPI";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: "idld",
  totalItems: 0,
  selectedProduct: null,
};

export const fetchAllProductAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchProducts();
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const fetchProductByFitlerAsync = createAsyncThunk(
  "products/fetchProductsByFilters",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination);
    const totalItems = await response.headers.get("x-total-count");
    return { products: response.data, totalItems: +totalItems };
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "products/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updataProductAsync = createAsyncThunk(
  "products/updateProduct",
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.products = action.payload.products;
      });
    builder
      .addCase(fetchProductByFitlerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByFitlerAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      });
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.categories = action.payload;
      });
    builder
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.brands = action.payload;
      });
    builder
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.products.push(action.payload);
      })
      .addCase(updataProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updataProductAsync.fulfilled, (state, action) => {
        state.status = "idld";
        const Index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        state.products[Index] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

//selector
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;
