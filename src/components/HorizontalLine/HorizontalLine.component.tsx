import React from "react";
type HorizontalLineProps = {
  textColor?: string;
  centerText?: string;
  backgroundColor?: string;
  height?: number;
};

export const HorizontalLine = React.forwardRef<
  HTMLHRElement,
  HorizontalLineProps
>((props, ref) => {
  return (
    <>
      <div className="flex items-center">
        <div className="flex-grow bg-gray-2 h-px"></div>
        {props.centerText && (
          <div className="flex-grow-0 mx-5 text text-xs text-neutral">
            {props.centerText}
          </div>
        )}
        <div className="flex-grow  bg-gray-2 h-px"></div>
      </div>
    </>
  );
});

HorizontalLine.displayName = "HorizontalLine";
