"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LucideProps } from "lucide-react";

interface IMenu {
  name: string;
  icon: React.ComponentType<LucideProps>;
  path: string;
}

export const Menus: React.FC<IMenu> = (props) => {
  const currentPath = usePathname();
  const Icon = props.icon as React.ComponentType<LucideProps>; // Store the icon component

  return (
    <Link
      href={props.path || "#"} // Ensure there's a valid href, even if path is undefined
      className={`rounded-xl  w-full py-0.5 mt-2 block transition-colors duration-300 ease-in-out ${currentPath === props.path ? "bg-[#2b386a]" : "bg-transparent hover:bg-[#25344d]"}`}
    >
      <div className="ml-3 my-2 gap-2 flex flex-row items-center justify-start text-sm font-normal transition-colors duration-300 ease-in-out">
        <Icon
          size={19}
          color={`${currentPath === props.path ? "#f3f4f6" : "#9ca3af"}`}
          strokeWidth={1.5}
        />
        {/* Render the icon component with props */}
        <p
          className={`transition-colors duration-300 ease-in-out ${currentPath === props.path ? "text-gray-200 font-medium" : "text-gray-400"}`}
        >
          {props.name}
        </p>
        {currentPath === props.path && (
          <div className="flex-1 flex items-center justify-end h-fit pr-1">
            <ChevronRight
              size={20}
              color={`${currentPath === props.path ? "#f3f4f6" : "#9ca3af"}`}
              strokeWidth={1.25}
            />
          </div>
        )}
      </div>
    </Link>
  );
};
