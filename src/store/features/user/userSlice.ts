import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type UserType = {
  id: string,
  username: string,
  email: string,
  accountType: 'ADMIN' | 'CONSUMER',
  image: string,
}

export type UserState = {
  user: UserType,
}

const initialState: UserState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action:PayloadAction<UserType>) => {
      state.user = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer