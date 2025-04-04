import { footerInfo } from "../../constants/constants";
import "./footerLinks.scss";

export default function FooterLinks() {
  return (
    <div className="footer_info">
      {footerInfo.map((column) => {
        const isTemplate = column.columnName === "TEMPLATE";

        return (
          <div key={column.columnName} className="footer_column">
            <p className="column_name">{column.columnName}</p>

            {column.components.map((item, index) =>
              isTemplate ? (
                <a
                  key={index}
                  href="https://www.google.com"
                  className="template_text"
                  target="_blank"
                >
                  {item}
                </a>
              ) : (
                <p key={index} className="template_text">
                  {item}
                </p>
              )
            )}
          </div>
        );
      })}
    </div>
  );
}
