import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './app/slice';
import authSlice from './auth/slice';
import blogsSlice from './blogs/slice';
import contactUsSlice from './contactUs/slice';
import homeSlice from './home/slice';
import orderSlice from './order/slice';

export const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [blogsSlice.name]: blogsSlice.reducer,
  [contactUsSlice.name]: contactUsSlice.reducer,
  [homeSlice.name]: homeSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
});
