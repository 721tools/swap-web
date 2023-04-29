import { createSlice } from '@reduxjs/toolkit'

export const processSlice = createSlice({
  name: 'process',
  initialState: {
    show: true,
    type: 'limit' // limit, sweep
  },
  reducers: {
    showProcess: (state, action) => {
      state.show = true
      state.type = action.payload
    },
    hideProcess: (state, action) => {
      state.show = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { hideProcess, showProcess } = processSlice.actions

export default processSlice.reducer
