import { MouseEventHandler } from "react";
import "./button.scss";

interface ButtonProps {
  buttonText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
  variant?: "primary" | "filter";
  disabled?: boolean;
}

export default function Button({
  buttonText,
  onClick,
  isActive,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      className={`button ${variant} ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
