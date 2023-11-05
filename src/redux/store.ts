import { configureStore } from "@reduxjs/toolkit"
import dataReducer from "./slices"

export default configureStore({
  reducer: {
    data: dataReducer,
  },
})
