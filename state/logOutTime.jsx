const { createSlice } = require("@reduxjs/toolkit");


export const logOutTimeSlice = createSlice({
  name: "logOutTime",
  initialState: {
    value: [],
  },
  reducers: {
    setlogOutTime: (state, { payload }) => {
      state.value = payload;
    },
    deletelogOutTime: (state) => {
      state.value = [];
    },
  },
})
export const { setlogOutTime, deletelogOutTime } = logOutTimeSlice.actions

export default logOutTimeSlice.reducer;