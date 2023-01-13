import { configureStore } from '@reduxjs/toolkit'
import processSlice from './reducers/processSlice'
import searchReducer from './reducers/searchSlice'
import collectionReducer from './reducers/collectionSlice'

export default configureStore({
  reducer: {
    search: searchReducer,
    process: processSlice,
    collection: collectionReducer
  }
})
