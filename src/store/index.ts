import { configureStore } from '@reduxjs/toolkit';
// import dashboardReducer from './dashboardSlice';
// import chatReducer from './chatSlice';

const store = configureStore({
  reducer: {
    // dashboard: dashboardReducer,
    // chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 