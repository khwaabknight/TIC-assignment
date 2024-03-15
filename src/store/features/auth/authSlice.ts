import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  token: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action:PayloadAction<string>) => {
      state.token = action.payload
    },
    resetToken: (state) => {
      localStorage.removeItem('token')
      state.token = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken, resetToken } = authSlice.actions

export default authSlice.reducer