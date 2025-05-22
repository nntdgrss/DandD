import { cn } from "@/lib/utils";

interface ITextGradientProps {
  text: string;
  className?: string;
  asChild?: boolean;
}

export default function TextGradient({
  text,
  className,
  asChild,
}: ITextGradientProps) {
  return (
    <>
      {asChild ? (
        <span
          className={cn(
            "bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text",
            className
          )}
        >
          {text}
        </span>
      ) : (
        <p
          className={cn(
            "bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text",
            className
          )}
        >
          {text}
        </p>
      )}
    </>
  );
}
