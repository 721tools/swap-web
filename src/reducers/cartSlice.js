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
    removeCartSelected: (state, action) => {
      state.selected = state.selected.filter((item) => {
        return item.token_id !== action.payload.token_id
      })
    },
    clearCart: (state, action) => {
      state.items = []
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setCartAvailable,
  clearCart,
  setCartSelected,
  removeCartSelected
} = cartSlice.actions

export default cartSlice.reducer
