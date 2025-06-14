import "./Tooltip.scss";
import { PropsWithChildren } from "react";

export default function Tooltip({ children, text }: PropsWithChildren<{ text: string }>) {
  return (
    <span className="tooltip" data-text={text}>
      {children}
    </span>
  );
}
