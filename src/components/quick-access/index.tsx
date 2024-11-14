"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface IQuickAccess {
  name: string;
  data: {
    name: string;
    icon: ReactNode;
    path: string;
  }[];
}
export const QuickAccess: React.FC<IQuickAccess> = (props) => {
  return (
    <div className="w-full">
      <div className="border-y border-gray-300 flex flex-row items-center justify-start w-full h-[24px] py-1.5 px-3">
        <p className="text-[11px] text-gray-600">{props.name}</p>
      </div>
      <div className="pl-4 pr-2 py-2 space-y-5 my-2">
        {props.data.map((value, index) => (
          <Link
            key={index}
            href={value.path || "#"}
            className="flex flex-row w-full items-center justify-start p-1 gap-2 h-[20px]"
          >
            {value.icon}
            <p className="text-[14px] hover:underline hover:decoration-sky-700 ">
              {value.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
