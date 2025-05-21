import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ILastOpenedProject {
  id: string;
  name: string;
  lastEdit: string;
  icon: string;
  onClick: (id: string) => void;
}

export default function LastOpenedProject({
  id,
  name,
  lastEdit,
  icon,
  onClick,
}: ILastOpenedProject) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="w-full"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(id)}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="dark:bg-stone-500/20 bg-stone-500/20 rounded-md p-2 w-full flex flex-row gap-2 items-center cursor-default"
        style={{
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
        }}
      >
        <p className="flex-row p-1 bg-slate-400/30 rounded-md size-11 apple flex items-center justify-center text-2xl select-none">
          {icon}
        </p>
        <div className="select-none">
          <p className="text-lg font-thin">{name}</p>
          <p className="text-sm font-thin dark:text-slate-300 text-zinc-600">
            last edit {lastEdit}
          </p>
        </div>
        <div className="ml-auto">
          <motion.div
            style={{
              scale: isHovered ? 1.2 : 1,
            }}
            className="flex items-center justify-center transition-all duration-200"
          >
            <ChevronRight
              className={cn(
                "dark:text-zinc-400 text-zinc-700",
                isHovered && "dark:text-zinc-100 text-zinc-900"
              )}
              size={32}
            />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
