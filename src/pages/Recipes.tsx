import { useGetRecipesQuery } from "../services/recipe";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link } from "react-router-dom";
import RecipeListSkeleton from "../components/skeletons/RecipeListSkeleton";
import { formatInShortMonthDayCommaYear } from "src/lib/formatters";
import { Timer } from "lucide-react";

function joinWithCommasWithMax3Items(array: string[]) {
  if (array.length > 3) {
    return array.slice(0, 3).join(", ") + ", ...";
  }
  return array.join(", ");
}

function Recipes() {
  const { data, error, isLoading } = useGetRecipesQuery();

  return (
    <main>
      <section className="container mx-auto mt-20 mb-40">
        <header className="text-foreground text-center max-w-[70ch] mx-auto bold mb-24">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl uppercase mb-8">
            feed yourself some good foods
          </h1>
          <h2 className="text-xl max-w-[45ch] mx-auto">
            다년간 축적된 노하우가 담긴 엄선된 레시피들을 확인해 보세요
            <span className="text-sm block mt-2">잘좀 먹고 다니세요~</span>
          </h2>
        </header>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {!isLoading ? (
            data?.map((recipe) => (
              <li>
                <Link to={`/recipe/${recipe.id}`}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{recipe.name}</CardTitle>
                      <CardDescription>{recipe.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        필요 재료:{" "}
                        {joinWithCommasWithMax3Items(
                          recipe.ingredients.map(({ ingredient }) => ingredient)
                        )}
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start">
                      <CardDescription className="w-full flex justify-between">
                        <div className="flex gap-1 items-center">
                          <Timer size={14} />
                          <p className="text-sm">
                            {recipe.estimatedTimeInMinutes} min
                          </p>
                        </div>
                        <span>
                          {formatInShortMonthDayCommaYear(recipe.createdAt)}
                        </span>
                      </CardDescription>
                    </CardFooter>
                  </Card>
                </Link>
              </li>
            ))
          ) : (
            <>
              <RecipeListSkeleton />
              <RecipeListSkeleton />
              <RecipeListSkeleton />
              <RecipeListSkeleton />
            </>
          )}
        </ul>
      </section>
    </main>
  );
}

export default Recipes;
