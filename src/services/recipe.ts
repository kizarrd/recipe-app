import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Recipe } from "../types";

export const recipeApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://665951ecde346625136bf46a.mockapi.io/api/v1/",
  }),
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => "/recipes",
    }),
    getRecipe: builder.query<Recipe, string>({
      query: (recipeId) => `/recipes/${recipeId}`,
    }),
  }),
});

export const { useGetRecipeQuery, useGetRecipesQuery } = recipeApi;
