import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteRecipeMutation, useGetRecipeQuery } from "../services/recipe";
import { Badge } from "../components/ui/badge";
import { Button, buttonVariants } from "../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { toast } from "../components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { useEffect, useState } from "react";
import {
  formatInShortMonthDayCommaYear,
  truncateFromThirdDecimals,
} from "src/lib/formatters";
import RecipeSkeleton from "../components/skeletons/RecipeSkeleton";
import { computeAmountForServings } from "src/lib/utils";

function Recipe() {
  let { recipeId } = useParams();

  const [deletRecipe, { isLoading: deleteIsLoading }] =
    useDeleteRecipeMutation();

  const navigate = useNavigate();

  async function handleDelete() {
    const result = await deletRecipe(recipeId!);
    if (result.data) {
      toast({
        title: "✅ 삭제되었습니다.",
      });
      navigate("/recipes");
    } else {
      toast({
        title: "❌ 삭제 실패. 다시 시도해 주세요.",
      });
    }
  }

  const {
    data: recipeData,
    error,
    isLoading: recipeIsLoading,
  } = useGetRecipeQuery(recipeId!);

  const [adjustableServings, setAdjustableServings] = useState<number>(0);
  // 초기값을 1로 하면 effect dependency에서 변화 감지 못하는 경우가 있기 때문에 refresh시 effect가 작동하지 않는 문제가 있었다.
  // servings 값이 최소 1이기 때문에 초기값을 0으로 설정하여 같은 값이 있을 수 없도록 하였다.
  const [ingredientsAmounts, setIngredientsAmounts] = useState<number[]>();
  const [sauceIngredientsAmounts, setSauceIngredientsAmounts] =
    useState<number[]>();

  useEffect(() => {
    if (recipeData) {
      setAdjustableServings(recipeData.servings);
    }
  }, [recipeData]);

  useEffect(() => {
    if (recipeData) {
      setIngredientsAmounts(
        recipeData.ingredients.map((ingredient) =>
            computeAmountForServings(
              ingredient.amount,
              adjustableServings,
              recipeData.servings,
            )
        )
      );
      setSauceIngredientsAmounts(
        recipeData.sauceIngredients.map((sauceIngredient) =>
          computeAmountForServings(
            sauceIngredient.amount,
            adjustableServings,
            recipeData.servings
          )
        )
      );
    }
  }, [adjustableServings]);

  if (recipeIsLoading) {
    return <RecipeSkeleton />;
  }
  if (error) {
    return <main className="text-foreground">Error!</main>;
  }
  if (recipeData) {
    const {
      name,
      createdAt,
      lastEdited,
      estimatedTimeInMinutes,
      description,
      ingredients,
      sauceIngredients,
      directions,
    } = recipeData;

    return (
      <main className="text-foreground">
        <header className="container text-center max-w-[70ch] mx-auto bold mt-10 mb-24">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl uppercase mb-2">
            {name}
          </h1>
          <h2 className="text-lg lg:text-xl max-w-[45ch] mx-auto mb-2">
            {description}
          </h2>
          <h3 className="text-sm lg:text-base max-w-[45ch] mx-auto mb-4">
            예상 조리시간: {estimatedTimeInMinutes}분
          </h3>
          {/* <div className="flex justify-center gap-2 max-w-72 flex-wrap mx-auto mb-4">
            <Badge variant={"secondary"} className="text-sm">
              tag
            </Badge>
            <Badge variant={"secondary"} className="text-sm">
              tag
            </Badge>
          </div> */}
          <h3 className="text-xs text-muted-foreground">
            최초 작성일: {formatInShortMonthDayCommaYear(createdAt)}
          </h3>
          <h3 className="text-xs text-muted-foreground">
            마지막 수정일: {formatInShortMonthDayCommaYear(lastEdited)}
          </h3>
        </header>
        <section className="max-w-[94ch] mx-auto">
          <div className="container grid md:grid-cols-2 gap-8 mb-24">
            <h1 className="text-5xl col-span-2 font-semibold">Ingredients</h1>
            <h2 className="col-span-2 flex gap-2 items-center">
              <Input
                className="w-20 text-lg"
                type="number"
                min={1}
                value={adjustableServings}
                onChange={(e) => {
                  setAdjustableServings(Number(e.target.value));
                }}
              />
              <span className="text-lg font-medium">인분 기준</span>
            </h2>
            <div className="max-md:col-span-2 bg-background border border-border rounded-2xl flex flex-col gap-4 p-8">
              <h4 className="text-3xl font-medium">재료</h4>
              <ul className="border-t-2 pt-4 border-foreground pl-2 font-normal">
                {ingredients.map((ingredient, index) => (
                  <li className="text-xl mb-2 flex items-center gap-2">
                    <Checkbox id={`ingredient-${index}`} className="w-5 h-5" />
                    <label
                      htmlFor={`ingredient-${index}`}
                      className="flex gap-2 hover:cursor-pointer"
                    >
                      <div>{ingredient.ingredient}</div>
                      <div>
                        <Badge variant={"default"} className="text-sm">
                          {ingredientsAmounts && ingredientsAmounts[index]}
                          {ingredient.unit}
                        </Badge>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-md:col-span-2 bg-background border border-border rounded-2xl flex flex-col gap-4 p-8">
              <h4 className="text-3xl font-medium">양념 재료</h4>
              <ul className="border-t-2 pt-4 border-foreground pl-2 font-normal">
                {sauceIngredients.map((sauceIngredient, index) => (
                  <li className="text-xl mb-2 flex items-center gap-2">
                    <Checkbox
                      id={`sauceIngredient-${index}`}
                      className="w-5 h-5"
                    />
                    <label
                      htmlFor={`sauceIngredient-${index}`}
                      className="flex gap-2 hover:cursor-pointer"
                    >
                      <div>{sauceIngredient.ingredient}</div>
                      <div>
                        <Badge variant={"default"} className="text-sm">
                          {sauceIngredientsAmounts &&
                            sauceIngredientsAmounts[index]}
                          {sauceIngredient.unit}
                        </Badge>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="container flex flex-col gap-8 pb-8">
            <h1 className="text-5xl col-span-2 font-semibold">Directions</h1>
            <div className="bg-background p-8 rounded-2xl border border-border">
              <ol className="flex flex-col gap-12">
                {directions.map(({ direction }, index) => (
                  <li>
                    <h4 className="mb-3 text-xl font-bold">Step {index + 1}</h4>
                    <p className="text-lg">{direction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="container flex justify-end mb-32">
            <div className="flex gap-4">
              <Button
                variant={"secondary"}
                className="text-md"
                disabled={deleteIsLoading}
              >
                <Link to={`/recipe/${recipeId}/edit`}>Edit</Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={deleteIsLoading}
                    variant="destructive"
                    className="text-md"
                  >
                    {deleteIsLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your recipe data from our server.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className={buttonVariants({ variant: "destructive" })}
                      onClick={handleDelete}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return null;
}

export default Recipe;
