import { configureStore } from '@reduxjs/toolkit'
import processSlice from './reducers/processSlice'
import searchReducer from './reducers/searchSlice'
import collectionReducer from './reducers/collectionSlice'
import cartSlice from './reducers/cartSlice'
import userSlice from './reducers/userSlice'

export default configureStore({
  reducer: {
    search: searchReducer,
    process: processSlice,
    collection: collectionReducer,
    cart: cartSlice,
    user: userSlice
  }
})
