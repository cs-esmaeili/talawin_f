const { createSlice } = require("@reduxjs/toolkit");


export const rolelice = createSlice({
  name: "role",
  initialState: {
    value: [],
  },
  reducers: {
    setrole: (state, { payload }) => {
      state.value = payload;
    },
    deleterole: (state) => {
      state.value = [];
    },
  },
})
export const { setrole, deleterole } = rolelice.actions

export default rolelice.reducer;