import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Assuming firebase.ts is in the same directory

// Define the type for your user state
interface UserState {
  currentUser: any | null;
  isLoading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: true,
};

// Create a slice for user-related state
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reducer to set user data
    setUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    // Reducer to handle loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setLoading } = userSlice.actions;

// This is the thunk that will handle the async call to Firestore
export const fetchUserInfo = (uid: string) => async (dispatch: any) => {
  if (!uid) {
    dispatch(setUser(null));
    return;
  }
  
  dispatch(setLoading(true));

  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch(setUser(docSnap.data()));
    } else {
      console.log("No such document!");
      dispatch(setUser(null));
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    dispatch(setUser(null)); // Set user to null on error
  } finally {
    dispatch(setLoading(false));
  }
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
