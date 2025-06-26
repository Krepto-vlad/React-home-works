import "./homeContent.scss";
import homeImage from "../../assets/homeImg.png";
import trustpilotImage from "../../assets/trustpilot.png";
import { Button } from "../Button/index";

export default function HomeContent() {
  return (
    <div className="home-wrapper">
      <div className="content">
        <div className="info-wrapper">
          <p className="title">
            Beautiful food & takeaway, <span className="delivered">delivered</span> to your
            door.
          </p>
          <p className="dummy-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500.
          </p>
          <Button
            buttonText="Place an Order"
            variant="primary"
            onClick={() => {}}
          />
          <img
            className="trustpilot-img"
            src={trustpilotImage}
            alt="trustpilot img"
          />
          <p className="reviews">
            <span className="rate">4.8 out of 5</span> based on 2000+ reviews
          </p>
        </div>
        <div className="image-wrapper">
          <img src={homeImage} alt="promotion img" />
        </div>
      </div>
    </div>
  );
}
