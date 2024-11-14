"use client";

import { Sidebar } from "../../components/sidebar";
interface ILayout {
  children: React.ReactNode;
}
export const Layout: React.FC<ILayout> = (props) => {
  return (
    <section className=" w-full h-screen  overflow-hidden flex flex-row items-start gap-2">
      <Sidebar />
      <div className="overflow-hidden pt-10 rounded-xl bg-white flex-1 h-full  shadow-lg ring-1 ring-gray-200  ">
        {props.children}
      </div>
    </section>
  );
};
