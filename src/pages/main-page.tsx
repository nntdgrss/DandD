import Logo from "../components/ui/Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from "react-router";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <div className="fixed top-5 right-5">
        <ModeToggle />
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <Logo size="lg" />
        <h1 className="font-thin text-lg mt-2 select-none">
          Easy way to manage your tasks
        </h1>

        <div className="h-1/2 w-[80%] p-4 flex flex-col items-center justify-center">
          <div className="text-lg dark:text-zinc-300 text-zinc-900 w-1/3 flex flex-row items-center justify-around">
            <p
              className="underline underline-offset-4 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
              onClick={() => navigate("/create")}
            >
              Create new table
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 mt-4 w-1/3 h-[20rem]"></div>

          {/* <button className="dark:bg-stone-500/20 bg-stone-500/20 rounded-md py-2 px-5">
            and 13 more...
          </button> */}
        </div>
      </div>
    </div>
  );
}
