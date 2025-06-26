import "./footer.scss";
import { FooterLinks } from "../footerLinks";
import { NavLink } from "react-router-dom";

import imageLogo from "../../assets/logo.png";
import Inst from "../../assets/inst.svg?react";
import Twitter from "../../assets/twit.svg?react";
import YT  from "../../assets/YT.svg?react";
import BackImg from "../../assets/24.svg?react";

export default function Footer() {
  return (
    <div className="footer">
      <BackImg className="back_img" />

      <div className="footer_nav">
        <div className="about_wrapper">
          <NavLink className="logo" to="/">
            <img src={imageLogo} alt="logo" />
          </NavLink>
          <p className="footer_nav_subtext">
            Takeaway & Delivery template for small - medium businesses.
          </p>
        </div>

        <div className="footer_columns">
          <FooterLinks />
        </div>
      </div>

      <div className="ads_section_wrapper">
        <p className="build_info">
          Built by <span style={{ color: "#35B8BE" }}>Flowbase</span>· Powered
          by <span style={{ color: "#35B8BE" }}>Webflow</span>
        </p>

        <div className="social_networks">
          <Inst className="social_icon" />
          <Twitter className="social_icon" />
          <YT className="social_icon" />
        </div>
      </div>
    </div>
  );
}
