import homeImage from "../../assets/homeImg.png";
import trustpilotImage from "../../assets/trustpilot.png";
import { Button } from "../Button/index";

import {
  HomeWrapper,
  Content,
  InfoWrapper,
  Title,
  Delivered,
  DummyText,
  TrustpilotImg,
  Reviews,
  Rate,
  ImageWrapper,
} from "./styles";

export default function HomeContent() {
  return (
    <HomeWrapper>
      <Content>
        <InfoWrapper>
          <Title>
            Beautiful food & takeaway, <Delivered>delivered</Delivered> to your
            door.
          </Title>
          <DummyText>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500.
          </DummyText>
          <Button
            buttonText="Place an Order"
            variant="primary"
            onClick={() => {}}
          />
          <TrustpilotImg src={trustpilotImage} alt="trustpilot img" />
          <Reviews>
            <Rate>4.8 out of 5</Rate> based on 2000+ reviews
          </Reviews>
        </InfoWrapper>
        <ImageWrapper>
          <img src={homeImage} alt="promotion img" />
        </ImageWrapper>
      </Content>
    </HomeWrapper>
  );
}
