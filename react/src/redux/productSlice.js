import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await fetch("http://localhost:4000/product")
  .then((response) => response.json())
  return response;
})
export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: []
  },

  reducers: {
    setProducts: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.products = action.payload 
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading'
        console.log('loading products')
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        
        // Add any fetched posts to the array
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log( action.error.message)
      })
  }
});

export const { setProducts  } = productSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectProducts = (state) => state.product.products;
export default productSlice.reducer;
