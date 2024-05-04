const { configureStore } = require("@reduxjs/toolkit");
import permissionSlice from "./permissions";

export const store = configureStore({
    reducer: {
        permissions: permissionSlice,
    },
    devTools: true
});
