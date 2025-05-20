import "./Tooltip.scss";
import { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  text: string;
}

export default function Tooltip({ children, text }: TooltipProps) {
  return (
    <span className="tooltip" data-text={text}>
      {children}
    </span>
  );
}
