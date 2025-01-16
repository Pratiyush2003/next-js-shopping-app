import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchallproducts = createAsyncThunk('getproducts', async (args, { rejectWithValue }) => {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=100&skip=10&select=title,price,images,description,category,rating,brand');
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue('Oops, found an error');
    }
});

export const products = createSlice({
    name: "getallproducts",
    initialState: {
        product: [],
        loading: true, 
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchallproducts.pending, (state) => {
                state.loading = true; 
            })
            .addCase(fetchallproducts.fulfilled, (state, action) => {
                state.loading = false; 
                state.product = action.payload.products; 
            })
            .addCase(fetchallproducts.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.payload;
            });
    }
});

export default products.reducer;
