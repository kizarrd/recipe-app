import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "../types";

type FormData = z.infer<typeof FormSchema>;

interface RecipeFormProps {
  form: UseFormReturn<FormData>;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  fieldsArrays: {
    ingredientsFieldsArray: UseFieldArrayReturn<FormData, "ingredients">;
    sauceIngredientsFieldsArray: UseFieldArrayReturn<FormData, "sauceIngredients">;
    directionsFieldsArray: UseFieldArrayReturn<FormData, "directions">;
  };
}

function RecipeForm({
  form,
  onSubmit,
  isLoading,
  fieldsArrays,
}: RecipeFormProps) {
  const {
    ingredientsFieldsArray: {
      fields: ingredientsFields,
      append: appendIngredient,
      remove: removeIngredient,
    },
    sauceIngredientsFieldsArray: {
      fields: sauceIngredientsFields,
      append: appendSauceIngredient,
      remove: removeSauceIngredient,
    },
    directionsFieldsArray: {
      fields: directionsFields,
      append: appendDirection,
      remove: removeDirection,
    },
  } = fieldsArrays;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>요리 이름</FormLabel>
              <FormControl>
                <Input placeholder="건두부 볶음" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>간단한 설명 또는 소개</FormLabel>
              <FormControl>
                <Input
                  placeholder="단백질 폭탄 꼬소한 건두부 볶음!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {ingredientsFields.map((item, index) => (
          <div className="flex gap-4" key={item.id}>
            <FormField
              control={form.control}
              name={`ingredients.${index}.ingredient`}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="">재료</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 건두부" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`ingredients.${index}.amount`}
              render={({ field }) => (
                <FormItem className="w-14">
                  <FormLabel>양</FormLabel>
                  <FormControl>
                    <Input placeholder="300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`ingredients.${index}.unit`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>단위</FormLabel>
                  <div className="flex gap-4">
                    <FormControl>
                      <Input className="w-14" placeholder="g" {...field} />
                    </FormControl>
                    <Button
                      onClick={() => {
                        removeIngredient(index);
                      }}
                    >
                      삭제
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button
          onClick={() => {
            appendIngredient(
              {
                ingredient: "",
                amount: 300,
                unit: "",
              },
              { shouldFocus: true, focusIndex: 0 }
            );
          }}
          type="button"
          variant={"secondary"}
        >
          재료 추가
        </Button>
        {sauceIngredientsFields.map((item, index) => (
          <div className="flex gap-4" key={item.id}>
            <FormField
              control={form.control}
              name={`sauceIngredients.${index}.ingredient`}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="">양념 재료</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 다진 마늘" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`sauceIngredients.${index}.amount`}
              render={({ field }) => (
                <FormItem className="w-14">
                  <FormLabel>양</FormLabel>
                  <FormControl>
                    <Input placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`sauceIngredients.${index}.unit`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>단위</FormLabel>
                  <div className="flex gap-4">
                    <FormControl>
                      <Input className="w-14" placeholder="큰술" {...field} />
                    </FormControl>
                    <Button
                      onClick={() => {
                        removeSauceIngredient(index);
                      }}
                    >
                      삭제
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button
          onClick={() => {
            appendSauceIngredient(
              {
                ingredient: "",
                amount: 1,
                unit: "",
              },
              { shouldFocus: true, focusIndex: 0 }
            );
          }}
          type="button"
          variant={"secondary"}
        >
          양념 재료 추가
        </Button>
        {directionsFields.map((item, index) => (
          <div className="flex gap-4" key={item.id}>
            <FormField
              control={form.control}
              name={`directions.${index}.direction`}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="">Step {index + 1}</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button
          onClick={() => {
            appendDirection({
              direction: "",
            });
          }}
          type="button"
          variant={"secondary"}
        >
          레시피 추가
        </Button>
        <div className="flex justify-end">
          <Button className="mt-6" disabled={isLoading} type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            저장
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RecipeForm;
