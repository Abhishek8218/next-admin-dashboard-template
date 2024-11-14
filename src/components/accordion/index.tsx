"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import React, { ReactNode, useRef, useState, useEffect } from "react";

interface AccordionProps {
  title: string;
  icon: ReactNode;
  isOpen: boolean;
  onClick: () => void;
  children: ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  icon,
  isOpen,
  onClick,
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | undefined>("0px");

  useEffect(() => {
    if (contentRef.current) {
      // Set height based on content's scrollHeight if open, otherwise 0px
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen, children]); // Add `children` to dependencies to recalculate height when content changes

  return (
    <div className="overflow-hidden">
      <button
        onClick={onClick}
        className="flex flex-row justify-start items-center w-full text-left focus:outline-none gap-2"
        aria-expanded={isOpen}
      >
        {icon}
        <span className="text-base font-medium text-white">{title}</span>
        <span className="flex flex-row w-full items-end justify-end h-fit">
          {isOpen ? (
            <ChevronDown size={20} color="#f8fafc" strokeWidth={1.25} />
          ) : (
            <ChevronRight size={20} color="#f8fafc" strokeWidth={1.25} />
          )}
        </span>
      </button>
      <div
        ref={contentRef}
        className="px-4 pb-4 transition-height overflow-hidden"
        style={{ height }}
      >
        {children}
      </div>
    </div>
  );
};
