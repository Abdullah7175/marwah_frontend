import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Blog } from '../type/Blog';
import { UmrahPackage } from '../type/UmrahPackage';

// Define the type for initial props
interface HomeState {
  selectedBlog:Blog;
  selectedPackage:UmrahPackage;
}

// Define a slice for the counter
const Slice = createSlice({
  name: 'counter',
  initialState: {
      selectedBlog: Blog.getDummy(),
      selectedPackage:UmrahPackage.getDummy()
  }  as HomeState,
  reducers: {
   
    selectBlog: (state, action: PayloadAction<Blog>) => {
      state.selectedBlog = action.payload;
      console.log(action.payload);
    },
    selectUmrahPackage: (state, action: PayloadAction<UmrahPackage>) => {
      state.selectedPackage = action.payload;
      console.log(action.payload);
    },
  },
});

// Export actions
export const { selectBlog,selectUmrahPackage } = Slice.actions;

// Create a Redux store with the combined reducers
export const store = configureStore({
  reducer: {
    home: Slice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false

  }),

});