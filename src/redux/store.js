import { configureStore } from "@reduxjs/toolkit";

import modal from "./slicers/modalSlicer";
import formData from "./slicers/formDataSlicer";

const store = configureStore({
    reducer: {
        modal,
        formData,
    },
});

export default store;
