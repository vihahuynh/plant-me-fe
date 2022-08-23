import { createSlice } from "@reduxjs/toolkit"

const initState = {
    applyFilters: {},
    selectedFilters: {},
}

const filterSllice = createSlice({
    name: 'filters',
    initialState: initState,
    reducers: {
        updateSelectFilters(state, action) {
            state.selectedFilters = action.payload.filters
        },
        applyFilter(state) {
            state.applyFilters = state.selectedFilters
        },
        clear(state) {
            state = initState
        }
    }
})

export default filterSllice