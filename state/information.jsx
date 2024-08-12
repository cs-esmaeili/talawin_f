const { createSlice } = require("@reduxjs/toolkit");


export const informationlice = createSlice({
  name: "information",
  initialState: {
    value: [],
  },
  reducers: {
    setinformation: (state, { payload }) => {
      state.value = payload;
    },
    deleteinformation: (state) => {
      state.value = [];
    },
  },
})
export const { setinformation, deleteinformation } = informationlice.actions

export default informationlice.reducer;