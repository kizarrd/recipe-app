import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { Button } from "../components/ui/button";
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
import { toast } from "../components/ui/use-toast";
import { useAddNewRecipeMutation } from "../services/recipe";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  ingredients: z.array(
    z.object({
      ingredient: z.string().min(1, { message: "Ingredient is required." }),
      amount: z.coerce
        .number()
        .gt(0, { message: "Amount should be greater than 0." }),
      unit: z.string().min(1, { message: "Unit is required" }),
    })
  ),
  // directions: z.string().array(),
  directions: z.array(z.object({ direction: z.string() })),
});

function CreateRecipe() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: [],
      directions: [],
    },
  });

  const {
    fields: ingredientsFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const {
    fields: directionsFields,
    append: appendDirection,
    remove: removeDirection,
  } = useFieldArray({
    control: form.control,
    name: "directions",
  });

  const [addNewRecipe, { isLoading }] = useAddNewRecipeMutation();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const { name, description, ingredients, directions } = data;
    const canSave =
      [name, description, ingredients, directions].every(Boolean) && !isLoading;
    if (canSave) {
      try {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
        await addNewRecipe({ name, description, ingredients, directions });
      } catch (err) {
        console.error("Failed to save the recipe:", err);
      }
    }
  }

  return (
    <main className="mx-6 mt-16 mb-16">
      <section className="max-w-[80ch] mx-auto border-border border rounded-2xl p-8">
        <Form {...form}>
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>요리 이름</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
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
                      <Input placeholder="shadcn" {...field} />
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
                        <FormLabel className="">Ingredient</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
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
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
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
                        <FormLabel>Username</FormLabel>
                        <div className="flex gap-4">
                          <FormControl>
                            <Input
                              className="w-14"
                              placeholder="shadcn"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            onClick={() => {
                              removeIngredient(index);
                            }}
                          >
                            Delete
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
                  appendIngredient({
                    ingredient: "",
                    amount: 1,
                    unit: "",
                  });
                }}
                type="button"
                variant={"secondary"}
              >
                Add Ingredient
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
                Add Direction
              </Button>
              <div className="flex justify-end">
                <Button
                  className="mt-6"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Form>
      </section>
    </main>
  );
}

export default CreateRecipe;
