import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Recipe } from "../types";

export const recipeApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://665951ecde346625136bf46a.mockapi.io/api/v1/",
  }),
  tagTypes: ["Recipe"],
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => "/recipes",
      providesTags: (result) =>
        result
          ? [
              { type: "Recipe", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Recipe" as const, id })),
            ]
          : [{ type: "Recipe", id: "LIST" }],
    }),
    getRecipe: builder.query<Recipe, string>({
      query: (recipeId) => `/recipes/${recipeId}`,
      providesTags: (result, error, arg) => [{ type: "Recipe", id: arg }],
    }),
    addNewRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: (recipeData) => ({
        url: "/recipes",
        method: "POST",
        body: recipeData,
      }),
      invalidatesTags: [{ type: "Recipe", id: "LIST" }],
    }),
    deleteRecipe: builder.mutation<Recipe, string>({
      query: (recipeId) => ({
        url: `/recipes/${recipeId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Recipe", id: "LIST" }],
    }),
    editRecipe: builder.mutation<
      Recipe,
      { recipeId: string; data: Partial<Recipe> }
    >({
      query: (recipe) => ({
        url: `/recipes/${recipe.recipeId}`,
        method: "PUT",
        body: recipe.data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Recipe", id: arg.recipeId },
        { type: "Recipe", id: "LIST" },
      ],
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
