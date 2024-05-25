const { createSlice } = require("@reduxjs/toolkit");


export const permissionSlice = createSlice({
  name: "permissions",
  initialState: {
    value: [],
  },
  reducers: {
    setPermissions: (state, { payload }) => {
      state.value = payload;
    },
    deletePermissions: (state) => {
      state.value = [];
    },
  },
})
export const { setPermissions, deletePermissions } = permissionSlice.actions

export default permissionSlice.reducer;