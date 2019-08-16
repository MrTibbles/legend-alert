import { styled } from "linaria/react";

const ContentArea = styled.section`
  min-height: 100vh;
  padding: 6.25rem 1rem 3.125rem;
  overflow: hidden;
  position: relative;

  @media (min-width: 600px) {
    width: 500px;
    margin: 0 auto;
  }
`;

export default ContentArea;
