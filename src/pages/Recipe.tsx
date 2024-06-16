import { useNavigate, useParams } from "react-router-dom";
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
  if (recipeIsLoading) {
    return <main className="text-foreground">Loading...</main>;
  }
  if (error) {
    return <main className="text-foreground">Error!</main>;
  }
  if (recipeData) {
    const { name, ingredients, directions } = recipeData;
    console.log(recipeData);

    return (
      <main className="text-foreground">
        <header className="text-center max-w-[70ch] mx-auto bold mt-10 mb-24">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl uppercase mb-2">
            {name}
          </h1>
          <h2 className="text-md lg:text-xl max-w-[45ch] mx-auto mb-4">
            맵싹한 마파두부 함 찌끄려 보이소~
          </h2>
          <div className="flex justify-center gap-2 max-w-72 flex-wrap mx-auto mb-4">
            <Badge variant={"secondary"} className="text-sm">
              tag
            </Badge>
            <Badge variant={"secondary"} className="text-sm">
              tag
            </Badge>
            <Badge variant={"secondary"} className="text-sm">
              tag
            </Badge>
            <Badge variant={"secondary"} className="text-sm">
              tag
            </Badge>
            <Badge variant={"secondary"} className="text-sm">
              tag
            </Badge>
            <Badge variant={"secondary"} className="text-sm">
              tag
            </Badge>
            <Badge variant={"secondary"} className="text-sm">
              tag
            </Badge>
          </div>
          <h3 className="text-xs text-slate-500">최초 작성일: 24.06.01</h3>
          <h3 className="text-xs text-slate-500">마지막 수정일: 24.06.01</h3>
        </header>
        <section className="max-w-[94ch] mx-auto">
          <div className="container grid md:grid-cols-2 gap-8 mb-24">
            <h1 className="text-5xl col-span-2 font-semibold">Ingredients</h1>
            <h2 className="col-span-2">1 인분 기준</h2>
            <div className="max-md:col-span-2 bg-yellow-500 rounded-2xl grid gap-4 p-8 text-neutral-800">
              <h4 className="text-3xl text-neutral-100 font-medium">재료</h4>
              <ul className="border-t-2 pt-4 border-black pl-2 font-medium">
                {ingredients.map((ingredient) => (
                  <li className="text-2xl mb-2">- {ingredient.ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="max-md:col-span-2 bg-cyan-500 rounded-2xl grid gap-4 p-8 text-neutral-800">
              <h4 className="text-3xl text-neutral-100 font-medium">양념</h4>
              <ul className="border-t-2 pt-4 border-black pl-2 font-medium">
                {ingredients.map((ingredient) => (
                  <li className="text-2xl mb-2">- {ingredient.ingredient}</li>
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
              <Button variant={"secondary"} className="text-md">
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="text-md">
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
                      disabled={deleteIsLoading}
                    >
                      {deleteIsLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
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
