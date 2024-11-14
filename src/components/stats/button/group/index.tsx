"use client";

import { useState } from "react";
import { StatsButton } from "..";
import { ChartNoAxesColumn } from "lucide-react";

interface IStatsButtonGroup {
  onChange: (event: string) => void;
  data: {
    qKey: string;
    title: string;
    value: string | number;
    colorVariant?: "default" | "primary" | "secondary"; // Color variant
  }[];
}

export const StatsButtonGroup: React.FC<IStatsButtonGroup> = (props) => {
  const [activeButton, setActiveButton] = useState<string>("");

  const handleStatsChange = (newValue: string) => {
    setActiveButton(newValue);
    props.onChange(newValue); // Notify parent component of the change
  };

  console.log("activeButton", activeButton);
  return (
    <div className="flex items-center justify-between w-full h-fit gap-4">
      {props.data.map((item) => (
        <StatsButton
          key={item.qKey}
          icon={
            <ChartNoAxesColumn size={16} color="#292828" strokeWidth={1.5} />
          }
          title={item.title}
          value={item.value}
          colorVariant={item.colorVariant} // Pass colorVariant prop
          onChange={() => handleStatsChange(item.qKey)} // Update state with qKey
        />
      ))}
    </div>
  );
};
