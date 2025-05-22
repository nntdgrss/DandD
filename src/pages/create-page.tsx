import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TextGradient from "@/components/ui/text-gradient";
import { createNewTableSchema } from "@/features/create-new-table/schemas/create-new.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";

export default function CreatePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-3xl select-none">
        Create new <TextGradient text="table" asChild />
      </p>
      <div className="w-full max-w-xs mt-5">
        <CreateNewTableForm />
      </div>
    </div>
  );
}

function CreateNewTableForm() {
  const form = useForm<z.infer<typeof createNewTableSchema>>({
    resolver: zodResolver(createNewTableSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof createNewTableSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of the table</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This will be the name of the table.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
