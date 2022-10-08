import { createSlice } from "@reduxjs/toolkit";

const initState = {
  dataType: "",
  filters: [],
};

const filterSllice = createSlice({
  name: "filters",
  initialState: initState,
  reducers: {
    updateFilters(state, action) {
      console.log(state.dataType);
      console.log(action.payload.dataType);
      if (state.dataType !== "" || state.dataType === action.payload.dataType) {
        state.filters = action.payload.filters || state.filters;
      } else {
        state.filters = [];
      }
      state.dataType = action.payload.dataType || state.dataType;
    },
    clear(state) {
      state.filters = [];
    },
  },
});

export default filterSllice;
