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
      <section className="container mx-auto pt-10">
        <header className=" text-white text-center">
          <h1 className="text-center">레시피</h1>
        </header>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {data?.map((recipe) => (
            <li>
              <Link to={recipe.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{recipe.name}</CardTitle>
                    <CardDescription>
                      맵싹 부드러운 사천식 마파두부
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
      <section className="container mx-auto bg-sky-500">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur
        accusantium unde officiis quia ullam ut voluptatibus placeat, laborum,
        esse cum at ex a consequatur. Voluptas fuga ratione sit reprehenderit
        soluta?
      </section>
      <section className="container mx-auto bg-sky-500">
        <ul>
          {data?.map((recipe) => (
            <li>
              <div>{recipe.name}</div>
            </li>
          ))}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur
          accusantium unde officiis quia ullam ut voluptatibus placeat, laborum,
          esse cum at ex a consequatur. Voluptas fuga ratione sit reprehenderit
          soluta?
        </ul>
      </section>
      <section>
        <div className="columns-2 text-white">
          <p>Well, let me tell you something, ...</p>
          <p className="break-before-column">Sure, go ahead, laugh...</p>
          <p>Maybe we can live without...</p>
          <p>Look. If you think this is...</p>
        </div>
      </section>
    </main>
  );
}

export default Recipes;
