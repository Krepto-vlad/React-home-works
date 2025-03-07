import { Component } from "react";
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

export default class FooterLinks extends Component {
  render() {
    return (
      <div className="footerInfo">
        {footerInfo.map((column) => {
          const isTemplate = column.columnName === "TEMPLATE";

          return (
            <div key={column.columnName} className="footerColumn">
              <p className="columnName">{column.columnName}</p>

              {column.components.map((item, index) =>
                isTemplate ? (
                  <a
                    key={index}
                    href="https://www.google.com"
                    className="templateText"
                  >
                    {item}
                  </a>
                ) : (
                  <p key={index} className="templateText">
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
