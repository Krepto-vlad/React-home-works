import { footerInfo } from "../../constants/constants";
import { NavLink } from "react-router-dom";
import "./footerLinks.scss";

export default function FooterLinks() {
  const routes = {
    Home: "/",
    Order: "/order",
  };

  return (
    <div className="footer_info">
      {footerInfo.map((column) => {
        const isTemplate = column.columnName === "TEMPLATE";

        return (
          <div key={column.columnName} className="footer_column">
            <p className="column_name">{column.columnName}</p>

            {column.components.map((item, index) => {
              const path = routes[item as keyof typeof routes];

              return path ? (
                <NavLink key={index} to={path} className="template_text">
                  {item}
                </NavLink>
              ) : (
                <NavLink
                  key={index}
                  to={`/${item.toLowerCase()}`}
                  className="template_text"
                >
                  {item}
                </NavLink>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
