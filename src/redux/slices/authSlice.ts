import { createSlice, PayloadAction, createAsyncThunk, isPending, isRejected } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axios'
import { User, RegisterResponse, LoginResponse, AuthState } from '../../types'
import { toast } from 'react-toastify'

// Thunk для регистрации
export const registerUser = createAsyncThunk<
  RegisterResponse,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await axiosInstance.post<RegisterResponse>('/register', userData)
    return response.data
  } catch (error: any) {
    let errorMessage = 'Неизвестная ошибка при регистрации.'
    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage
    }
    return thunkAPI.rejectWithValue(errorMessage)
  }
})

// Thunk для входа
export const loginUser = createAsyncThunk<LoginResponse, { email: string; password: string }, { rejectValue: string }>(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post<LoginResponse>('/login', credentials)
      return response.data
    } catch (error: any) {
      let errorMessage = 'Неизвестная ошибка при входе.'
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage
      }
      return thunkAPI.rejectWithValue(errorMessage)
    }
  },
)

// Thunk для получения данных пользователя
export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get<User>('/me')
      return response.data
    } catch (error: any) {
      let errorMessage = 'Неизвестная ошибка при получении данных пользователя.'
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage
      }
      return thunkAPI.rejectWithValue(errorMessage)
    }
  },
)

// Инициализация состояния
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
}

// Создание слайса
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    // Обработка состояний fulfilled для каждой санки индивидуально
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
      toast.success('Регистрация прошла успешно!')
    })

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
      toast.success('Вход выполнен успешно!')
    })

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
    })

    // Обработка общих состояний pending для всех санок
    builder.addMatcher(isPending(registerUser, loginUser, fetchUser), (state) => {
      state.loading = true
      state.error = null
    })

    // Обработка общих состояний rejected для всех санок
    builder.addMatcher(isRejected(registerUser, loginUser, fetchUser), (state, action) => {
      state.loading = false
      state.error = action.payload || 'Неизвестная ошибка'
      if (action.payload) {
        toast.error(action.payload)
      }
    })
  },
})

export const { logout, setUser } = authSlice.actions

export default authSlice.reducer
