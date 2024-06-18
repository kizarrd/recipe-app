import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { toast } from "../components/ui/use-toast";
import { useAddNewRecipeMutation } from "../services/recipe";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FormSchema } from "../types";
import RecipeForm from "../components/RecipeForm";

function CreateRecipe() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      servings: 1,
      sauceIngredients: [{ ingredient: "", amount: 1, unit: "" }],
      ingredients: [{ ingredient: "", amount: 1, unit: "" }],
      directions: [{ direction: "" }],
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

  const [addNewRecipe, { isLoading, isSuccess, isError }] =
    useAddNewRecipeMutation();

  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const {
      name,
      description,
      servings,
      sauceIngredients,
      ingredients,
      directions,
    } = data;
    const canSave =
      [name, description, ingredients, directions].every(Boolean) && !isLoading;
    if (canSave) {
      try {
        const result = await addNewRecipe({
          name,
          description,
          ingredients,
          directions,
        });
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

  return (
    <main className="mx-6 mt-16 mb-16">
      <section className="max-w-[80ch] mx-auto border-border border rounded-2xl p-8">
        <RecipeForm
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
          fieldsArrays={{
            ingredientsFieldsArray,
            sauceIngredientsFieldsArray,
            directionsFieldsArray,
          }}
        />
      </section>
    </main>
  );
}

export default CreateRecipe;
