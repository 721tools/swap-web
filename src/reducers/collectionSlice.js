import { createSlice } from '@reduxjs/toolkit'

export const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    info: null,
    more: null
  },
  reducers: {
    setCollection: (state, action) => {
      state.info = action.payload
    },
    clearCollection: (state, action) => {
      state.info = null
      state.more = null
    },
    setMoreInfo: (state, action) => {
      state.more = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setCollection, clearCollection, setMoreInfo } =
  collectionSlice.actions

export default collectionSlice.reducer
