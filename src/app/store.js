import { configureStore } from '@reduxjs/toolkit';
import musicsSlice from '../features/musicsSlice';


const store = configureStore({
  reducer: {
    musics: musicsSlice
  },
})

export default store