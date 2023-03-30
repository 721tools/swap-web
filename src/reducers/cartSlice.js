import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    available: [],
    selected: []
  },
  reducers: {
    setCartAvailable: (state, action) => {
      state.available = action.payload
    },
    setCartSelected: (state, action) => {
      state.selected = action.payload
    },
    clearCart: (state, action) => {
      state.items = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { setCartAvailable, clearCart, setCartSelected } =
  cartSlice.actions

export default cartSlice.reducer
