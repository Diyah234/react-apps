import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";




interface UserState {
  user: User | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: UserState = {
  user: null,
  loading: "idle"
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) =>{
            state.user = action.payload;
            state.loading = "succeeded";
        },
        clearUser: (state)=>{
            state.user = null;
            state.loading = "succeeded";
        },
        setLoading: (state, action: PayloadAction<UserState["loading"]>) => {
      state.loading = action.payload;
    }
    }
})

export const { setUser, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
