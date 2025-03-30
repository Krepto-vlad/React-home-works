import { PureComponent } from "react";
import "./footerLinks.scss";

const footerInfo = [
  {
    columnName: "COMPANY",
    components: ["Home", "Order", "FAQ", "Contact"],
  },
  {
    columnName: "TEMPLATE",
    components: ["Style Guide", "Changelog", "License", "Webflow University"],
  },
  {
    columnName: "FLOWBASE",
    components: ["More Cloneables"],
  },
];

export default class FooterLinks extends PureComponent {
  render() {
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
}
