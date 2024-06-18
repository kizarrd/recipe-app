import { z } from "zod";

type Ingredient = {
  ingredient: string;
  amount: number;
  unit: string;
}

type Direction = {
  direction: string;
}

export type Recipe = {
  createdAt: Date;
  name: string;
  servings: number;
  ingredients: Ingredient[];
  sauceIngredients: Ingredient[];
  description: string;
  directions: Direction[];
  id: string;
};

export const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  servings: z.coerce
    .number()
    .gt(0, { message: "Servings should be greater than 0." }),
  ingredients: z.array(
    z.object({
      ingredient: z.string().min(1, { message: "Ingredient is required." }),
      amount: z.coerce
        .number()
        .gt(0, { message: "Amount should be greater than 0." }),
      unit: z.string().min(1, { message: "Unit is required" }),
    })
  ),
  sauceIngredients: z.array(
    z.object({
      ingredient: z.string().min(1, { message: "Ingredient is required." }),
      amount: z.coerce
        .number()
        .gt(0, { message: "Amount should be greater than 0." }),
      unit: z.string().min(1, { message: "Unit is required" }),
    })
  ),
  // directions: z.string().array(),
  directions: z.array(z.object({ direction: z.string() })),
});