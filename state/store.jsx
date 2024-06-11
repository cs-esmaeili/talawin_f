const { configureStore } = require("@reduxjs/toolkit");
import permissionSlice from "./permissions";
import apiDataSlice from "./apiData";
import productPricesSlice from "./productPrices";

export const store = configureStore({
    reducer: {
        permissions: permissionSlice,
        apiData: apiDataSlice,
        productPrices: productPricesSlice,
    },
    devTools: true
});
