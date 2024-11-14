"use client";

import { ChevronLeft, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  back?:boolean
  tool?:boolean
  name?:string
  action?:{
    newAndSave?:{
      onClick?:()=>void,
      formid?:string,
      visible?:boolean
    },
    save?:{
      onClick?:()=>void,
      formid?:string,
      visible?:boolean
    },add?:{
      onClick?:()=>void,
      formid?:string,
      visible?:boolean
    }
  }
}

export const Header: React.FC<HeaderProps> = (props) => {
  const router = useRouter();
  console.log("clicked")

  return (
    <div className=" flex flex-row w-full h-fit border-b p-4">
      <div className="flex flex-row h-full w-full items-center justify-between">
        <div className="flex flex-row items-center justify-start w-fit h-fit gap-2">
          {
            !props.back && <ChevronLeft 
            className="cursor-pointer" 
            onClick={() => router.back()} 
            size={28} 
            color="#292828" 
            strokeWidth={1.75} 
          />
          }
          <h3 className="select-none text-xl font-medium">{props.title}</h3>
        </div>
        <div >
      <div className="w-fit h-fit flex flex-row items-center justify-end gap-3">
      <button form={props?.action?.add?.formid} className="bg-blue-600 w-[100px] px-1 py-1 text-sm text-white rounded-md">
        {props.name ? `${props.name}` : "ADD"}
        </button>
        {/* <button form={props.action?.add?.formid} className="bg-black w-[100px] px-1 py-1 text-sm text-white rounded-md">
        PRINT
        </button> */}
      </div>

        </div>
       {props.tool &&  <Settings size={16} color="#292828" strokeWidth={1.5} />}
      </div>
    </div>
  );
};
