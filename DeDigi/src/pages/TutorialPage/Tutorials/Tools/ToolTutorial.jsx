/* eslint-disable no-unused-vars */
import React from 'react';
import Icon from '../../../../components/Icon';
import colors from '../../../../constants/colors';
import toolDetails from '../../../../constants/toolDesc';
import { BlockContainer, Heading, AlignCenterContainer, TutorialContainer, HeadingIcon, FlexContainer, Image, SubText, Iframe } from '../styles';

export default function ToolTutorial(props) {
  const { toolAlt } = props;
  const toolDetailIdx = toolDetails.findIndex((toolDetail) => toolDetail.id === toolAlt);
  const { name, desc, images, url, icon, instructions, notes } = toolDetails[toolDetailIdx];

  return (
    <TutorialContainer>
      {/* Brief description */}
      <BlockContainer>
        <AlignCenterContainer>
          <Heading>{name}</Heading>
          <HeadingIcon>
            <Icon IconImg={icon} />
          </HeadingIcon>
        </AlignCenterContainer>
        <p>{desc}</p>
      </BlockContainer>

      {/* Demo video */}
      {images && (
        <BlockContainer>
          <Heading>Demo images</Heading>
          <FlexContainer>
            {images.map((image) => (
              <Image src={image} alt={`demo image for ${name}`} />
            ))}
          </FlexContainer>
        </BlockContainer>
      )}

      {/* Demo video */}
      {url && (
        <BlockContainer>
          <Heading>Demo videos</Heading>
          <Iframe
            src={url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </BlockContainer>
      )}

      {/* Instructions */}
      <BlockContainer>
        <Heading>Instructions</Heading>
        {instructions ? (
          <div>
            <p>{instructions.desc}</p>
            <BlockContainer>
              {instructions.details?.map((detail) => (
                <p>
                  — <SubText>{detail?.name}</SubText>: {detail?.desc}
                </p>
              ))}
            </BlockContainer>
          </div>
        ) : (
          <p>There is no instructions for this tool mode.</p>
        )}
      </BlockContainer>

      {/* Notes */}
      {notes && (
        <BlockContainer>
          <Heading>Notes</Heading>
          {notes.map((note) => (
            <p>— {note}</p>
          ))}
        </BlockContainer>
      )}
    </TutorialContainer>
  );
}
