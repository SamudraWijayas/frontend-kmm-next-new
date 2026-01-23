import React from "react";

interface Props {
  colors: [string, string];
  count: string | number;
  title: string;
  icon?: React.ReactNode;
}

const DashboardBox = ({ colors, count, title, icon }: Props) => {
  return (
    <div
      className="relative rounded-xl p-6 overflow-hidden"
      style={{
        background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 z-[1]"
        style={{ backgroundImage: `url("/images/Frame.png")` }}
      />

      {/* Content */}
      <div className="relative z-[2] flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-white text-base md:text-xl font-medium">
            {title}
          </h4>
          <span className="block text-white text-3xl md:text-4xl font-bold leading-none">
            {count}
          </span>
        </div>

        {icon && (
          <div className="text-white text-4xl md:text-5xl flex items-center">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardBox;
