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
          {data?.map((recipe) => (
            <li>
              <Link to={`/recipe/${recipe.id}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{recipe.name}</CardTitle>
                    <CardDescription>
                      {recipe.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>필요 재료: </p>
                  </CardContent>
                  <CardFooter>
                    <p>예상 소요 시간: 10분</p>
                  </CardFooter>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Recipes;
