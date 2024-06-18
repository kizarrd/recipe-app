import { useEditRecipeMutation, useGetRecipeQuery } from "../services/recipe";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "../components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FormSchema } from "../types";
import RecipeForm from "../components/RecipeForm";

function UpdateRecipe() {
  let { recipeId } = useParams();

  const {
    data: recipeData,
    error,
    isLoading: recipeIsLoading,
  } = useGetRecipeQuery(recipeId!);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: [],
      directions: [],
    },
  });

  const ingredientsFieldsArray = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const sauceIngredientsFieldsArray = useFieldArray({
    control: form.control,
    name: "sauceIngredients",
  });

  const directionsFieldsArray = useFieldArray({
    control: form.control,
    name: "directions",
  });

  useEffect(() => {
    if (recipeData) {
      form.reset({
        name: recipeData.name,
        servings: recipeData.servings,
        description: recipeData.description,
        ingredients: recipeData.ingredients,
        sauceIngredients: recipeData.sauceIngredients,
        directions: recipeData.directions,
      });
    }
  }, [recipeData, form, form.reset]);

  const [editRecipe, { isLoading, isSuccess, isError }] =
    useEditRecipeMutation();

  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const { name, description, ingredients, directions } = data;
    const canSave =
      [name, description, ingredients, directions].every(Boolean) &&
      !isLoading &&
      recipeId !== undefined;
    if (canSave) {
      try {
        const result = await editRecipe({ recipeId: recipeId!, data });
        if (result.data) {
          toast({
            title: "✅  저장되었습니다.",
          });
          navigate("/recipes");
        } else {
          toast({
            title: "❌  저장에 실패했습니다.",
          });
        }
      } catch (err) {
        console.error("Failed to save the recipe:", err);
      }
    }
  }

  if (recipeIsLoading) {
    return <main className="text-foreground">Loading...</main>;
  }
  if (error) {
    return <main className="text-foreground">Error!</main>;
  }
  if (recipeData) {
    const { name, ingredients, directions } = recipeData;

    return (
      <main className="mx-6 mt-16 mb-16">
        <section className="max-w-[80ch] mx-auto border-border border rounded-2xl p-8">
          <RecipeForm form={form} onSubmit={onSubmit} isLoading={isLoading} fieldsArrays={{
            ingredientsFieldsArray,
            sauceIngredientsFieldsArray,
            directionsFieldsArray
          }} />
        </section>
      </main>
    );
  }

  return null;
}

export default UpdateRecipe;
