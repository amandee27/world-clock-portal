import { configureStore } from "@reduxjs/toolkit";
import clockStateSlice from "./slices/clockStateSlice.tsx";
import { loadState } from "./localStorage.tsx";

export type AppState = {
  clockState: ReturnType<typeof clockStateSlice>;
};

const persistedState = loadState();

export const store = configureStore<AppState>({
  reducer: {
    clockState: clockStateSlice,
  },
  preloadedState: persistedState,
});
