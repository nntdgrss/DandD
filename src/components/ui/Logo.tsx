import { cn } from "@/lib/utils";

interface ILogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: ILogoProps) {
  return (
    <p className="font-bold flex items-center gap-1 select-none">
      <span
        className={cn(
          "bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xl rounded-md px-1",
          size === "sm" && "text-sm",
          size === "md" && "text-xl",
          size === "lg" && "text-2xl"
        )}
        style={{
          filter: "drop-shadow(0 0 10px rgba(0, 0, 255, 0.5))",
        }}
      >
        Drag
      </span>
      <span
        className={cn(
          "text-2xl font-bold",
          size === "sm" && "text-sm",
          size === "md" && "text-xl",
          size === "lg" && "text-2xl"
        )}
      >
        &
      </span>
      <span
        className={cn(
          "bg-gradient-to-r from-pink-400 to-pink-600 text-white text-xl rounded-md px-1",
          size === "sm" && "text-sm",
          size === "md" && "text-xl",
          size === "lg" && "text-2xl"
        )}
        style={{
          filter: "drop-shadow(0 0 10px rgba(255, 0, 0, 0.5))",
        }}
      >
        Drop
      </span>
    </p>
  );
}
