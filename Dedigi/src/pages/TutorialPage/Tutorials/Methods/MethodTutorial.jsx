/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BlockContainer,
  Heading,
  HighlightText,
  SubText,
  SubTextBlock,
  TutorialContainer,
  Image,
  Iframe,
  TwoColumnBlockContainer,
  AlignCenterContainer,
  FlexContainer,
} from '../styles';
import methodDetails from '../../../../constants/methodDesc';
import methods from '../../../../constants/methods';

export default function MethodTutorial(props) {
  const { methodAlt } = props;
  const methodIdx = methods.findIndex((methodItem) => methodItem.alt === methodAlt);
  const { tooltip } = methods[methodIdx];

  const methodDetailIdx = methodDetails.findIndex((method) => method.id === methodAlt);
  const { name, desc, url, images, instructions, pitfalls } = methodDetails[methodDetailIdx];

  function getItalics(str) {
    if (str.includes('/italic')) {
      return <em>{str.split('/italic')[1]}</em>;
    }
    return <p>{str}</p>;
  }

  function getNewLine(str) {
    if (str.includes('\n')) {
      return str.split('\n').map((item) => {
        return getItalics(item);
      });
    }
    return <p>{str}</p>;
  }

  return (
    <TutorialContainer>
      <BlockContainer>
        <Heading>{name}</Heading>
        <p>
          <SubText>Brief description: </SubText>
          {tooltip}
        </p>
      </BlockContainer>
      {/* Detail description */}
      <BlockContainer>
        <Heading>Description</Heading>
        <p>{getNewLine(desc)}</p>
      </BlockContainer>

      {/* Demo Images and Demo Video */}
      <BlockContainer>
        <Heading>Examples</Heading>
        <TwoColumnBlockContainer>
          <BlockContainer>
            <div>
              <SubTextBlock>Demo Images</SubTextBlock>
              <FlexContainer>{images && images.map((image) => <Image src={image} alt={`demo image for ${name}`} />)}</FlexContainer>
              {/* <p>To be updated</p> */}
            </div>
          </BlockContainer>
          {url && (
            <BlockContainer>
              <p>
                <SubTextBlock>Demo Video</SubTextBlock>
                <Iframe
                  src={url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {/* <p>To be updated</p> */}
              </p>
            </BlockContainer>
          )}
        </TwoColumnBlockContainer>
      </BlockContainer>

      {/* Instructions */}
      {instructions && (
        <BlockContainer>
          <Heading>Instructions</Heading>
          <p>{instructions.desc}</p>
          {instructions.parameters && (
            <BlockContainer>
              <HighlightText>Inputs</HighlightText>
              {instructions.parameters?.map((parameter) => (
                <BlockContainer>
                  <p>{parameter.name}:</p>
                  <p>— Description: {parameter.desc}</p>
                  {parameter.range && <p>— Range: {parameter.range}</p>}
                </BlockContainer>
              ))}
            </BlockContainer>
          )}
          {instructions.details && (
            <BlockContainer>
              <HighlightText>Details</HighlightText>
              {instructions.details?.map((detail) => (
                <p>— {detail}</p>
              ))}
            </BlockContainer>
          )}
        </BlockContainer>
      )}

      {/* Pitfalls */}
      {pitfalls && (
        <BlockContainer>
          <Heading>Pitfalls</Heading>
          <p>{pitfalls.desc}</p>
          {pitfalls.details?.map((detail) => (
            <p>— {detail}</p>
          ))}
        </BlockContainer>
      )}
    </TutorialContainer>
  );
}
