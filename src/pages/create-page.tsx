import { ModeToggle } from "@/components/mode-toggle";
import {
  createNewTableSchema,
  type CreateNewTableSchema,
} from "@/features/create-new-table/schemas/create-new.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";

export default function CreatePage() {
  return (
    <div className="container mx-auto">
      <div className="fixed top-5 right-5">
        <ModeToggle />
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl">Create new table</p>
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
}
