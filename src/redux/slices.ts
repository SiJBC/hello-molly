import { createSlice } from "@reduxjs/toolkit"
import { UserProfile } from "../types"

type DataState = { data: [] | UserProfile[]; user: UserProfile | {} }
const initialState: DataState = {
  data: [],
  user: {},
}

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export default dataSlice.reducer
export const { setData, setUser } = dataSlice.actions
