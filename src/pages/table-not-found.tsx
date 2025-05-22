import { Button } from "@/components/ui/button";

export default function TableNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>Sorry, table not found</p>
      <Button>Go to home</Button>
    </div>
  );
}
