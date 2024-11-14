"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface IStateButton {
  icon?: ReactNode;
  title?: string;
  value?: number | string;
  onChange?: () => void;
  colorVariant?: "default" | "primary" | "secondary"; // Color variant for card background
}

export const StatsButton: React.FC<IStateButton> = (props) => {
  const baseStyle =
    "ring-1 rounded-md w-full h-fit px-3 py-2 space-y-2 text-gray-500";
  const colorStyles = {
    default: "bg-white ring-gray-400", // Default color
    primary: "bg-blue-500 ring-blue-300", // Primary color
    secondary: "bg-green-500 ring-green-300", // Secondary color
  };

  const colorClass = colorStyles[props.colorVariant || "default"];

  return (
    <Link
      href={"#"}
      onClick={props.onChange}
      className={`${baseStyle} ${colorClass}`}
    >
      <div className="w-full h-fit flex flex-row items-center justify-start gap-1.5">
        {props.icon}
        <p className="text-xs">{props.title}</p>
      </div>
      <p className="text-xl font-bold">{props.value}</p>
    </Link>
  );
};
