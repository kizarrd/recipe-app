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
  description: string;
  ingredients: Ingredient[];
  directions: Direction[];
  recipe: string[];
  id: string;
};
