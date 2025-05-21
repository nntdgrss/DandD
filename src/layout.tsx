import { Outlet } from "react-router";
import { ModeToggle } from "./components/mode-toggle";

export default function Layout() {
  return (
    <div className="container mx-auto">
      <div className="fixed top-5 right-5">
        <ModeToggle />
      </div>
      <Outlet />
    </div>
  );
}
