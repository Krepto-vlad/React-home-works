import "./NotFoundPage.scss";
import ImageSmile from "../../assets/smile.svg?react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not_found_wrapper">
      <div className="icon_wrapper">
        <p className="four_symbol">4</p>
        <ImageSmile className="image_smile"/>
        <p className="four_symbol">4</p>
      </div>
      <p className="not_found_title">OOPS! PAGE NOT FOUND</p>
      <p className="not_found_message">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className="button primary">Go to home</Link>
    </div>
  );
}
