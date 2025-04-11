import "./Tooltip.scss";

export default function Tooltip({ children, text } ) {
    
    return (
      <span className="tooltip" data-text={text}>
        {children}
      </span>
    );
}