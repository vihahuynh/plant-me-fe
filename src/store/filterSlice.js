import { createSlice } from "@reduxjs/toolkit";

const initState = {
  applyFilters: [],
  selectedFilters: {},
};

const filterSllice = createSlice({
  name: "filters",
  initialState: initState,
  reducers: {
    updateSelectFilters(state, action) {
      state.selectedFilters = action.payload.selectedFilters;
      state.applyFilters = action.payload.applyFilters;
    },
    clear(state) {
      state.selectedFilters = {};
      state.applyFilters = [];
    },
  },
});

export default filterSllice;
