/* eslint-disable no-unused-vars */
import React from 'react';
import appDetails from '../../../constants/appDesc';
import colors from '../../../constants/colors';
import {
  Paragraph,
  BlockContainer,
  Heading,
  HrefText,
  SubTextBlock,
  TutorialContainer,
  TwoColumnBlockContainer,
  FootnoteText,
} from '../Tutorials/styles';

export default function AppDescription() {
  const { name, fullname, meaning, desc, detail, contributors, supervisors } = appDetails;

  function getNewLine(str) {
    if (str.includes('\n')) {
      return str.split('\n').map((item) => {
        return <Paragraph>{item}</Paragraph>;
      });
    }
    return <p>{str}</p>;
  }

  return (
    <TutorialContainer>
      <Heading>
        {name} ({fullname})
      </Heading>
      {/* Meaning */}
      <BlockContainer>
        <SubTextBlock style={{ color: colors.lightaqua }}>DeDigi - Meaning</SubTextBlock>
        <p>{getNewLine(meaning)}</p>
      </BlockContainer>

      {/* Description */}
      <BlockContainer>
        <Heading>Description</Heading>
        <p>{getNewLine(desc)}</p>
      </BlockContainer>

      <TwoColumnBlockContainer>
        {/* Contributors */}
        <BlockContainer>
          <Heading>Contributors</Heading>
          <div>
            {contributors.map((contributor, idx) => {
              if (idx === contributors.length - 1) return <span key={contributor}>{contributor}</span>;
              return <span key={contributor}>{contributor} ⦿ </span>;
            })}
          </div>
        </BlockContainer>

        {/* Supervisors */}
        <BlockContainer>
          <Heading>Supervisors</Heading>
          <div>
            {supervisors.map((contributor, idx) => {
              if (idx === contributors.length - 1) return <span key={contributor}>{contributor}</span>;
              return <span key={contributor}>{contributor} ⦿ </span>;
            })}
          </div>
        </BlockContainer>
      </TwoColumnBlockContainer>

      <BlockContainer>
        <FootnoteText>
          {detail} <HrefText href="mailto:dedigi.diftool@gmail.com">dedigi.diftool@gmail.com</HrefText>
        </FootnoteText>
      </BlockContainer>
    </TutorialContainer>
  );
}
