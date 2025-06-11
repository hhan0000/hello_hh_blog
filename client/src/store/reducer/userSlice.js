import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login } from "@/api/user";

// 初始状态
const initialState = {
  id: null,
  username: null,
  email: null,
  avatar: null,
  token: undefined,
  isLogin: false,
};

export const login = createAsyncThunk(
  "user/fetchLogin",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Login(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 设置令牌
    setToken: (state, action) => {
      state.token = action.payload;
    },
    // 设置用户信息
    setUserInfo: (state, action) => {
      Object.assign(state, action.payload);
    },
    // 清除用户信息（退出登录）[3](@ref)
    clearUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.isLogin = false;
      })

      .addCase(login.fulfilled, (state, action) => {
        const { id, username, email, avatar, token } = action.payload;
        state.id = id;
        state.username = username;
        state.email = email;
        state.avatar = avatar;
        state.token = token;
        state.isLogin = true;
      })
      // 登录失败
      .addCase(login.rejected, (state) => {
        state.isLogin = false;
      });
  },
});

export const { setToken, setUserInfo, clearUser } = userSlice.actions;
export default userSlice.reducer;
