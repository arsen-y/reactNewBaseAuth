import { configureStore } from '@reduxjs/toolkit'
import authReducer, { logout } from './slices/authSlice'
import { setLogout } from '../utils/axios'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

// Устанавливаем функцию logout в axios.ts
setLogout(() => {
    store.dispatch(logout());
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
