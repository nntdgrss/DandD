import { Button } from "@/components/ui/button";
import TextGradient from "@/components/ui/text-gradient";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TextGradient className="text-9xl font-bold" text="404" />
      <p className="text-2xl mt-4 font-thin">Sorry, page not found</p>
      <Button className="mt-4" onClick={() => navigate("/")} variant="outline">
        Go to home
      </Button>
    </div>
  );
}
