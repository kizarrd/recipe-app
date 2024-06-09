type Ingredient = {
  ingredient: string;
  amount: number;
  unit: string;
}

export type Recipe = {
  createdAt: Date;
  name: string;
  description: string;
  ingredients: Ingredient[];
  recipe: string[];
  id: string;
};
