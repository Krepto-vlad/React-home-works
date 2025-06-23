import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/index";
import "./NotFoundPage.scss";
import imageSmile from "../../assets/smile.png";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="not_found_wrapper">
      <div className="icon_wrapper">
        <p className="four_symbol">4</p>
        <img src={imageSmile} alt="sad smile" />
        <p className="four_symbol">4</p>
      </div>
      <p className="not_found_title">OOPS! PAGE NOT FOUND</p>
      <p className="not_found_message">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Button
        buttonText="Go to Home"
        onClick={() => navigate("/")}
        variant="primary"
      />
    </div>
  );
}
