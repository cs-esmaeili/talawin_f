const { createSlice } = require("@reduxjs/toolkit");


export const boxPricesSlice = createSlice({
  name: "boxPrices",
  initialState: {
    value: [],
  },
  reducers: {
    setboxPrices: (state, { payload }) => {
      state.value = payload;
    },
    deleteboxPrices: (state) => {
      state.value = [];
    },
  },
})
export const { setboxPrices, deleteboxPrices } = boxPricesSlice.actions

export default boxPricesSlice.reducer;