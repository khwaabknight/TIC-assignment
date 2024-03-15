import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type UserType = {
  _id: string,
  name: string,
  email: string,
  accountType: 'ADMIN' | 'CONSUMER' | 'PUBLIC',
  image: string,
}

export type UserState = {
  user: UserType,
}

const initialState: UserState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {
    _id: '',
    name: '',
    email: '',
    accountType: 'PUBLIC',
    image: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action:PayloadAction<UserType>) => {
      state.user = action.payload
    },
    resetUser: (state) => {
      state.user = {
        _id: '',
        name: '',
        email: '',
        accountType: 'PUBLIC',
        image: '',
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer