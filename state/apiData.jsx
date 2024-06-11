const { createSlice } = require("@reduxjs/toolkit");


export const apiDataSlice = createSlice({
  name: "apiData",
  initialState: {
    value: [],
  },
  reducers: {
    setApiData: (state, { payload }) => {
      state.value = payload;
    },
    deleteApiData: (state) => {
      state.value = [];
    },
  },
})
export const { setApiData, deleteApiData } = apiDataSlice.actions

export default apiDataSlice.reducer;