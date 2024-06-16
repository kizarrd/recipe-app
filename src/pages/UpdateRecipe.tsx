import { useParams } from "react-router-dom";

function UpdateRecipe() {
  let { recipeId } = useParams();

  return (<div>
    update {recipeId}
  </div>)
};

export default UpdateRecipe;