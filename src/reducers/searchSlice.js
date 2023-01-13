import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    input: '',
    active: false
  },
  reducers: {
    inputSearch: (state, action) => {
      state.input = action.payload
    },
    toggleSearch: (state, action) => {
      state.active = action.payload
      if (action.payload === false) {
        state.input = ''
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { inputSearch, toggleSearch } = searchSlice.actions

export default searchSlice.reducer
