import styled from 'styled-components';
import colors from '../../../constants/colors';

const TutorialContainer = styled.div`
  p {
    font-size: 1.1rem;
    line-height: 1.6rem;
  }
  em {
    font-size: 0.8rem;
    display: block;
    line-height: 1.3rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const Paragraph = styled.p`
  margin-bottom: 0.5rem;
`;

const HighlightText = styled.p`
  color: #3ce3be;
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem 0;
  font-weight: 500;
`;

const SubText = styled.span`
  color: ${colors.lightjean};
  font-style: italic;
  font-size: 1.1rem;
`;

const SubTextBlock = styled(SubText)`
  display: block;
  margin-bottom: 0.5rem;
`;

const Heading = styled.h3`
  color: ${colors.primary};
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

const HeadingIcon = styled.div`
  margin-left: 0.5rem;
`;

const AlignCenterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;

  ${Heading} {
    margin-bottom: 0rem;
  }
`;

const BlockContainer = styled.div`
  margin-bottom: 1.2rem;
`;

const TwoColumnBlockContainer = styled(BlockContainer)`
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 1.5rem;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 280px;
`;

const Iframe = styled.iframe`
  width: 100%;
  display: block;
  max-width: 400px;
  height: 225px;
`;

const HrefText = styled.a`
  color: ${colors.lightaqua};
`;

const FootnoteText = styled.h5`
  margin-top: 3rem;
  font-size: 0.9rem;
  font-weight: 400;
  font-style: italic;
`;

export {
  TutorialContainer,
  AlignCenterContainer,
  Paragraph,
  BlockContainer,
  TwoColumnBlockContainer,
  HighlightText,
  SubText,
  SubTextBlock,
  Heading,
  HeadingIcon,
  Image,
  Iframe,
  HrefText,
  FootnoteText,
  FlexContainer,
};
