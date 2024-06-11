const { createSlice } = require("@reduxjs/toolkit");


export const productPricesSlice = createSlice({
  name: "productPrices",
  initialState: {
    value: [],
  },
  reducers: {
    setProductPrices: (state, { payload }) => {
      state.value = payload;
    },
    deleteProductPrices: (state) => {
      state.value = [];
    },
  },
})
export const { setProductPrices, deleteProductPrices } = productPricesSlice.actions

export default productPricesSlice.reducer;