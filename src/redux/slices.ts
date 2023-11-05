import { createSlice } from "@reduxjs/toolkit"
import { UserProfile } from "../types"

type DataState = {
  data: [] | UserProfile[]
  user: UserProfile | {}
  theme: "Engineering" | "Sales" | "Marketing" | "HR" | "Default"
  styles: Styles
}

type BackgroundStyles = {
  color: "orange" | "blue" | "green" | "gray" | "black"
  backgroundImageUrl: string
  backgroundGradientClass: string
  mediaCardBackground: string
  footerGradientBackground?: string
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
  theme: "Default",
  styles: {
    Engineering: {
      color: "blue",
      backgroundImageUrl: "url(/img_hero_blue.png)",
      mediaCardBackground:
        "max-w-xs lg:max-w-xs relative after:absolute after:top-[-5%] after:right-[-5%] after:w-full after:h-1/2 after:bg-gradient-to-l after:from-blue-200 after:to-indigo-900 after:-z-10 h-60 w-80",
      backgroundGradientClass: "bg-gradient-to-r from-blue-500 to-indigo-900",
      footerGradientBackground:
        "mt-72 lg:mt-0 w-screen bg-gradient-to-r from-blue-500 to-indigo-900 h-[2px] padding-0",
    },
    HR: {
      color: "orange",
      backgroundImageUrl: "url(/img_hero_yellow.png)",
      mediaCardBackground:
        "max-w-xs lg:max-w-xs relative after:absolute after:top-[-5%] after:right-[-5%] after:w-full after:h-1/2 after:bg-gradient-to-l after:from-yellow-500 after:to-yellow-100 after:-z-10 h-60 w-80",
      backgroundGradientClass: "bg-gradient-to-r from-yellow-500 to-yellow-100",
      footerGradientBackground:
        "mt-72 lg:mt-0 w-screen bg-gradient-to-r from-yellow-500 to-yellow-100 h-[2px] padding-0",
    },
    Sales: {
      color: "black",
      backgroundImageUrl: "url(/img_hero_black.png)",
      mediaCardBackground:
        "max-w-xs lg:max-w-xs relative after:absolute after:top-[-5%] after:right-[-5%] after:w-full after:h-1/2 after:bg-gradient-to-l after:from-gray-900 after:to-gray-100 after:-z-10 h-60 w-80",
      backgroundGradientClass:
        "bg-gradient-to-r from-gray-900 via-transparent to-gray-100",
      footerGradientBackground:
        "mt-72 lg:mt-0 w-screen bg-gradient-to-r from-gray-900 to-gray-100 h-[2px] padding-0",
    },
    Marketing: {
      color: "green",
      backgroundImageUrl: "url(/img_hero_green.png)",
      mediaCardBackground:
        "max-w-xs lg:max-w-xs relative after:absolute after:top-[-5%] after:right-[-5%] after:w-full after:h-1/2 after:bg-gradient-to-l after:from-green-500 after:to-green-900 after:-z-10 h-60 w-80",
      backgroundGradientClass: "bg-gradient-to-r from-green-500 to-green-900",
      footerGradientBackground:
        "mt-72 lg:mt-0 w-screen bg-gradient-to-r from-green-500 to-green-900 h-[2px] padding-0",
    },
    Default: {
      color: "gray",
      backgroundImageUrl: "url(/img_hero_grey.png)",
      backgroundGradientClass: "bg-gradient-to-r from-gray-900 to-gray-400",
      mediaCardBackground:
        "max-w-xs lg:max-w-xs relative after:absolute after:top-[-5%] after:right-[-5%] after:w-full after:h-1/2 after:bg-gradient-to-l after:from-gray-900 after:to-gray-400 after:-z-10 h-60 w-80",
      footerGradientBackground:
        "mt-72 lg:mt-0 w-screen bg-gradient-to-r from-gray-900 to-gray-400 h-[2px] padding-0",
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
