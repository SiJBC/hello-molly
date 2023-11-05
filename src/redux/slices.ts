import { render } from "@testing-library/react"
import { createSlice } from "@reduxjs/toolkit"
import { UserProfile } from "../types"

type DataState = {
  data: [] | UserProfile[]
  user: UserProfile | {}
  theme: "Engineering" | "Sales" | "Marketing" | "HR" | "Default"
  styles: Styles
}

type BackgroundStyles = {
  backgroundImageUrl: string
  backgroundGradientClass: string
  mediaCardBackground: string
}

type Styles = {
  Engineering: BackgroundStyles
  HR: BackgroundStyles
  Sales: BackgroundStyles
  Marketing: BackgroundStyles
  Default: BackgroundStyles
}

const initialState: DataState = {
  data: [],
  user: {},
  theme: "HR",
  styles: {
    Engineering: {
      backgroundImageUrl: "url(/img_hero_blue.png)",
      mediaCardBackground:
        "after:bg-gradient-to-l after:from-blue-200 after:to-indigo-900 after:-z-10 h-60 w-80",
      backgroundGradientClass: "bg-gradient-to-r from-blue-500 to-indigo-900",
    },
    HR: {
      backgroundImageUrl: "url(/img_hero_yellow.png)",
      mediaCardBackground:
        "after:bg-gradient-to-l after:from-yellow-100 after:to-yellow-500 after:-z-10 h-60 w-80",
      backgroundGradientClass: "bg-gradient-to-r from-yellow-100 to-yellow-500",
    },
    Sales: {
      backgroundImageUrl: "url(/img_hero_black.png)",
      mediaCardBackground:
        "after:bg-gradient-to-l after:from-gray-900 after:to-gray-100 after:-z-10 h-60 w-80",
      backgroundGradientClass:
        "bg-gradient-to-r from-gray-900 via-transparent to-gray-100",
    },
    Marketing: {
      backgroundImageUrl: "url(/img_hero_green.png)",
      mediaCardBackground:
        "after:bg-gradient-to-l after:from-green-500 after:to-green-900 after:-z-10 h-60 w-80",
      backgroundGradientClass: "bg-gradient-to-r from-green-500 to-green-900",
    },
    Default: {
      backgroundImageUrl: "url(/img_hero_blue.png)",
      backgroundGradientClass:
        "after:bg-gradient-to-l after:from-blue-200 after:to-indigo-900 after:-z-10 h-60 w-80",
      mediaCardBackground: "bg-gradient-to-r from-blue-500 to-indigo-900",
    },
  },
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
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export default dataSlice.reducer
export const { setData, setUser, setTheme } = dataSlice.actions
