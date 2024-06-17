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
    addNewRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: (recipeData) => ({
        url: "/recipes",
        method: "POST",
        body: recipeData,
      }),
    }),
    deleteRecipe: builder.mutation<Recipe, string>({
      query: (recipeId) => ({
        url: `/recipes/${recipeId}`,
        method: "DELETE",
      }),
    }),
    editRecipe: builder.mutation<Recipe, { recipeId: string; data: Partial<Recipe> }>({
      query: (recipe) => ({
        url: `/recipes/${recipe.recipeId}`,
        method: "PUT",
        body: recipe.data,
      }),
    }),
  }),
});

export const {
  useGetRecipeQuery,
  useGetRecipesQuery,
  useAddNewRecipeMutation,
  useDeleteRecipeMutation,
  useEditRecipeMutation,
} = recipeApi;
