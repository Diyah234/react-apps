import { createSlice } from "@reduxjs/toolkit";


interface ThemeState {
    darkmode: boolean;
}


const initialState: ThemeState = {
    darkmode: false
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
       toggletheme: (state)=>{
        state.darkmode = !state.darkmode
       }
    }
})

export const { toggletheme } = themeSlice.actions;
export default themeSlice.reducer;
