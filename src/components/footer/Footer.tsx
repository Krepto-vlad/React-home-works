import "./footer.scss";
import { FooterLinks } from "../footerLinks";
import { NavLink } from "react-router-dom";

import imageLogo from "../../assets/logo.png";
import inst from "../../assets/inst.png";
import YT from "../../assets/YT.png";
import twitter from "../../assets/twit.png";
import backImg from "../../assets/24.png";

export default function Footer() {
  return (
    <div className="footer">
      <img className="back_img" src={backImg} alt="backImg" />

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
          <img src={inst} alt="inst" />
          <img src={twitter} alt="twitter" />
          <img src={YT} alt="YT" />
        </div>
      </div>
    </div>
  );
}
