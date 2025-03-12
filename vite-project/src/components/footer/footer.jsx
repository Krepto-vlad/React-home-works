import { Component } from "react";

import "./footer.scss";
import { FooterLinks } from "../footerLinks";

import ImageLogo from "../../assets/Logo.png";
import inst from "../../assets/inst.png";
import YT from "../../assets/YT.png";
import twitter from "../../assets/twit.png";
import backImg from "../../assets/24.png";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <img className="backImg" src={backImg} alt="backImg" />

        <div className="footer_nav">
          <div className="about_wrapper">
            <a className="logo" href="/">
              <img src={ImageLogo} alt="logo" />
            </a>
            <p>Takeaway & Delivery template for small - medium businesses.</p>
          </div>

          <div className="footer_columns">
            <FooterLinks />
          </div>
        </div>

        <div className="SNS">
          <p>
            Built by <span style={{ color: "#35B8BE" }}>Flowbase</span>· Powered
            by <span style={{ color: "#35B8BE" }}>Webflow</span>
          </p>

          <div>
            <img src={inst} alt="inst" />
            <img src={twitter} alt="twitter" />
            <img src={YT} alt="YT" />
          </div>
        </div>
      </div>
    );
  }
}
