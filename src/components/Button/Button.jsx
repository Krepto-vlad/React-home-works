import "./button.scss";

export default function Button({
  buttonText,
  onClick,
  isActive,
  variant = "primary",
}) {
  return (
    <button
      className={`button ${variant} ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
