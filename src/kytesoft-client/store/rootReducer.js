import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './app/slice';
import blogSlice from './blog/slice';
import cartSlice from './cart/slice';
import productSlice from './product/slice';
import userSlice from './user/slice';

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [blogSlice.name]: blogSlice.reducer,
  [productSlice.name]: productSlice.reducer,
});

export default rootReducer;
