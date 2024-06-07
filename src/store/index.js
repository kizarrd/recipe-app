import { configureStore } from "@reduxjs/toolkit";
import { recipeApi } from "../services/recipe";

export default configureStore({
  reducer: {
    [recipeApi.reducerPath]: recipeApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware),
});
