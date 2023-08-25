import { configureStore } from '@reduxjs/toolkit';
import mapOptionReducer from './reducer';

export const store = configureStore({
  reducer: { mapOption: mapOptionReducer },
});
