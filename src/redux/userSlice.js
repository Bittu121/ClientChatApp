import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    listOfUsers: null,
    selectedUser: null,
    onlineUsers: [],
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setlistOfUsers: (state, action) => {
      state.listOfUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      console.log("Updating onlineUsers:", action.payload);
      state.onlineUsers = action.payload;
    },
  },
});
export const { setAuthUser, setlistOfUsers, setSelectedUser, setOnlineUsers } =
  userSlice.actions;
export default userSlice.reducer;
