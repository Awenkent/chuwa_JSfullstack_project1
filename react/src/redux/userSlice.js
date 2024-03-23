import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk('user/fetchUsers', async () => {
    if(localStorage.getItem("token"))
    {
      console.log("founded token")
          const token = localStorage.getItem("token");
          const response = await fetch("http://localhost:4000/user/profile",{
            method:'GET',
            headers:{
                'Authorization' : `Bearer ${token}`,
                'Content-Type':'application/json;charset=UTF-8',
            },
            mode:'cors',
            cache:'default'

          }).then(res => {
          if(res.ok) {  
            return res.json()
          // handle the response
          }
          else if(res.status === 401)
          {
             alert("Your session is ended, please login again.");
             localStorage.removeItem("token");
             window.location.href = "/";
          }
          else
          {
              console.log(res.status);
              return res.text().then(text => { throw new Error(text) });
          }
        }) .catch(error => {
              console.log("The error is: " + error);
             // alert("Your session is ended, please login again.");
         });
         console.log(response)
         
         return response;
    }
    else
    {
      return {
        userName: null,
        shoppingCart: [],
        totalPrice: 0,
        role: "Regular",
      };
    }
    
 
})
const defaultState = {
  userName: null,
  shoppingCart: [],
  totalPrice: 0,
  role: "Regular",
}
export const userSlice = createSlice({
  name: "user",
  initialState: defaultState,

  reducers: {
    setUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userName = action.payload.userName;
      state.shoppingCart = action.payload.shoppingCart;
      state.role = action.payload.role;
      state.totalPrice = action.payload.shoppingCart.reduce((currentPrice, product) => {
        return currentPrice + Number(product.price);
      }, 0);
    },
    setCart: (state, action) => {
      state.shoppingCart = action.payload;
      
      state.totalPrice = action.payload.reduce((currentPrice, product) => {
        return currentPrice + Number(product.price);
      }, 0);
      
    }
 
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = 'loading'
        console.log('loading user')
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded'    
        state.userName = action.payload.userName;
        state.shoppingCart = action.payload.shoppingCart;
        state.role = action.payload.role;
        state.totalPrice = action.payload.shoppingCart.reduce((currentPrice, product) => {
          return currentPrice + Number(product.price);
        }, 0);
        // Add any fetched posts to the array
       
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log( action.error.message)
      })
  }
});

export const { setUser, setCart } = userSlice.actions;

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
export const selectUsername = (state) => state.user.name;
export const selectCart = (state) => state.user.shoppingCart;
export const selectTotalPrice = (state) => state.user.totalPrice;
export const selectRole = (state) => state.user.role;
export const selectUser = (state ) => state.user;
export default userSlice.reducer;
