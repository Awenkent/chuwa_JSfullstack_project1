import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk('user/fetchUsers', async (defaultUser) => {
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
          }
          else if(res.status === 401)
          {
             alert("Your session is ended, please login again.");
             localStorage.removeItem("token");
             window.location.href = "/";
          }
          else
          {
              return res.text().then(text => { throw new Error(text) });
          }
        }) .catch(error => {
              console.log("The error is: " + error);
              throw new Error("fetchUser Connection failed")
             // alert("Your session is ended, please login again.");
         });
        
         if(defaultUser)
         {
            
          response.originalCart = defaultUser.shoppingCart
         }
        
         return response;
    }
    else
    {
      throw new Error("No token founded")
    }
})

export const updateUser = createAsyncThunk('product/updateUser', async (user) => {
  const token = localStorage.getItem("token");
  if(token)
  {
  const response = fetch("http://localhost:4000/user",{
    method:'PUT',
    headers:{
      'Authorization' : `Bearer ${token}`,
      'Content-Type':'application/json;charset=UTF-8',
  },
    body: JSON.stringify(user),
    mode:'cors',
    cache:'default'
  }).then(res => {
    if(res.ok) {  
     
      return res.json()
    }
    else if(res.status === 401)
    {
       alert("Your session is ended, please login again.");
       localStorage.removeItem("token");
       window.location.href = "/";
    }
    else
    {
        return res.text().then(text => { throw new Error(text) });
    }
  }) .catch(error => {
        console.log("The error is: " + error);
        throw new Error("updateUser Connection failed")
       // alert("Your session is ended, please login again.");
   });

   
    return response;
  }
  else
  {
    throw new Error("No token founded")
  }
})


const defaultState = {
  user :{
  userName: null,
  shoppingCart: [],
  totalPrice: 0,
  role: "Regular",
  },
  currentPage:1,
  displayUser:"none",
  displayCart:"none",
  cartMerged: false,
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
      state.user.userName = action.payload.userName;
      state.user.shoppingCart = action.payload.shoppingCart;
      state.user.role = action.payload.role;
      state.user.totalPrice = action.payload.shoppingCart.reduce((currentPrice, product) => {
        return currentPrice + Number(product.price);
      }, 0);
    },
    setCurrentPage:(state,action) =>{
      state.currentPage = action.payload
    },
    setCartMerge: (state, action) => {
      state.cartMerged = false
    },
    setCart: (state, action) => {
      state.user.shoppingCart = action.payload;
      state.user.totalPrice = action.payload.reduce((currentPrice, product) => {
        return currentPrice + Number(product.price);
      }, 0);
    },
    setDisplayUser: (state,action)=>{
      console.log(action)
      state.displayUser = action.payload
    },
    setDisplayCart: (state,action)=>{
      console.log(action)
      state.displayCart = action.payload
    }
 
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = 'loading'
        console.log('loading user')
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log('fetch user successful')
        console.log(action.payload)
        console.log(state)
        if(action.payload.originalCart)
        {
          console.log("merge cart")
          state.cartMerged = true
          state.user.shoppingCart = [...action.payload.originalCart,...action.payload.shoppingCart];
        }
        else
        {
          state.cartMerged = false
          state.user.shoppingCart = action.payload.shoppingCart;
        }
        state.user.userName = action.payload.userName;
        state.user.role = action.payload.role;
        state.user.totalPrice = action.payload.shoppingCart.reduce((currentPrice, product) => {
          return currentPrice + Number(product.price);
        }, 0);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log( action.error.message)
      })
      .addCase(updateUser.pending, (state, action) => {
        state.status = 'loading'
        console.log('updating user')
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action)
        state.user.shoppingCart = action.payload.shoppingCart;
        state.user.totalPrice = action.payload.shoppingCart.reduce((currentPrice, product) => {
          return currentPrice + Number(product.price);
        }, 0); 
       
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log( action.error.message)
      })
  }
});

export const { setUser, setCart,setDisplayUser,setCartMerge ,setDisplayCart,setCurrentPage} = userSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUsername = (state) => state.user.user.name;
export const selectCart = (state) => state.user.user.shoppingCart;
export const selectTotalPrice = (state) => state.user.user.totalPrice;
export const selectRole = (state) => state.user.user.role;
export const selectUser = (state ) => state.user.user;
export const selectDisplayUser = (state) => state.user.displayUser;
export const selectDisplayCart = (state) => state.user.displayCart;
export const selectWholeUser = (state) => state;
export const selectCartMerged = (state) => state.user.cartMerged
export const selectCurrentPage = (state) => state.user.currentPage
export default userSlice.reducer;
