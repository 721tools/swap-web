import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    login: false,
    info: null
  },
  reducers: {
    login: (state, action) => {
      state.info = action.payload
      state.login = true
    }
  }
})

// Action creators are generated for each case reducer function
export const { login } = userSlice.actions

export default userSlice.reducer
