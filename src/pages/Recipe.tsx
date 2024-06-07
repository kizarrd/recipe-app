import { useGetRecipesQuery } from "../services/recipe";

function Recipe() {
  const { data, error, isLoading } = useGetRecipesQuery();

  return (
    <div className="w-64 h-10 bg-sky-500">
      <ul>
        {data?.map((recipe) => (
          <li>
            <div>{recipe.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recipe;
