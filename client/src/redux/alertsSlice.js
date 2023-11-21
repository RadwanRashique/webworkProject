//  to display loading spinners or indicators while fetching data from an API or performing other asynchronous operations. By using Redux and this slice, you can manage the loading state globally in your application
import { createSlice } from "@reduxjs/toolkit";
export const alertsSlice = createSlice({
    name: "alerts",
    initialState: {
        loading: false,
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        },
    },
});

export const { showLoading, hideLoading } = alertsSlice.actions;