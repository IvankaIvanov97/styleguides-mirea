import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    form: {
      value: 0,
      option: 0,
    },
    system: {
      value: 0,
    },
    agents: {
      value: [false, false, false, false, false, false],
      option: 0,
    },
    fts: {
        value: false
    },
    employees: {
        value: 0
    }
  },
};

const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setFormData(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
