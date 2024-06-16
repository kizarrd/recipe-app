import { useGetRecipeQuery } from "../services/recipe";
import { useParams } from "react-router-dom";

function UpdateRecipe() {
  let { recipeId } = useParams();

  const {
    data: recipeData,
    error,
    isLoading: recipeIsLoading,
  } = useGetRecipeQuery(recipeId!);
  if (recipeIsLoading) {
    return <main className="text-foreground">Loading...</main>;
  }
  if (error) {
    return <main className="text-foreground">Error!</main>;
  }
  if (recipeData) {
    const { name, ingredients, directions } = recipeData;
    console.log(recipeData);

    return <div>update {recipeId}</div>;
  }

  return null;
}

export default UpdateRecipe;
