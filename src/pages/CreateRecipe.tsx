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
      amount: z.coerce.number().gt(0, { message: "Amount should be greater than 0." }),
      unit: z.string().min(1, { message: "Unit is required" }),
    })
  ),
});

function CreateRecipe() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const [addNewRecipe, { isLoading }] = useAddNewRecipeMutation();
  
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const { name, description, ingredients } = data;
    const canSave = [name, description, ingredients ].every(Boolean) && !isLoading;
    if(canSave) {
      try {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        });
        await addNewRecipe({ name, description, ingredients })
      } catch (err) {
        console.error('Failed to save the recipe:', err);
      }
    }
  }


  return (
    <main className="mx-6">
      <section className="max-w-[80ch] mx-auto bg-neutral-800 rounded-2xl p-8">
        <Form {...form}>
          <div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=""
              // className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fields.map((item, index) => (
                <div className="flex gap-4" key={item.id}>
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.ingredient`}
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel className="text-white">Ingredient</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
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
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
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
                              remove(index);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                onClick={() => {
                  append({
                    ingredient: "",
                    amount: 1,
                    unit: "",
                  });
                }}
                type="button"
              >
                Add Ingredient
              </Button>

              <Button className="mt-6" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </Form>
      </section>
    </main>
  );
}

export default CreateRecipe;
