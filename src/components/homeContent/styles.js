import styled from "styled-components";

export const HomeWrapper = styled.div`
  padding: 100px 120px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: #f5fbfc;
    top: 0;
    left: 0;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 18% 70%);
  }
`;

export const Content = styled.div`
  display: flex;
  font-family: "Inter", sans-serif;
  align-items: center;
  justify-content: center;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  max-height: 500px;

  button {
    max-width: 190px;
  }
`;

export const Title = styled.p`
  font-weight: 400;
  font-size: 60px;
  line-height: 60px;
  letter-spacing: 1.8px;
  color: #08090a;
  margin-bottom: 28px;
`;

export const Delivered = styled.span`
  color: #35b8be;
`;

export const DummyText = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 24.12px;
  letter-spacing: 0.36px;
  color: #546285;
  margin-bottom: 54px;
  max-width: 540px;
`;

export const TrustpilotImg = styled.img`
  width: 110px;
  height: 28px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const Reviews = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #08090a;
`;

export const Rate = styled.span`
  color: #35b8be;
`;

export const ImageWrapper = styled.div`
  img {
    display: block;
  }
`;
