import React from 'react';
import styled from 'styled-components';
import IconButton from '../../../components/IconButton';
import colors from '../../../constants/colors';
import { toolBarIcons } from '../../../constants/icons';
import methods from '../../../constants/methods';

const Title = styled.h5`
  font-weight: bold;
  color: ${colors.white};
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  font-style: italic;
  text-transform: capitalize;
  cursor: pointer;
  color: ${(props) => (props.isActive ? colors.primary : colors.lightjean)};
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const IconContainer = styled.div`
  margin-right: 1rem;
`;

const ToolBarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 24px);
  grid-gap: 0.5rem 1rem;
  justify-content: space-between;
  margin: 1rem 0;
  margin-bottom: 1.5rem;
`;

const MethodBarContainer = styled.div`
  margin: 1rem 0;
`;

export default function TutorialSelector(props) {
  const { selected, setSelected } = props;

  function setToolSelected(toolName) {
    setSelected({
      type: 'tool',
      selectedName: toolName,
    });
  }

  function setMethodSelected(methodName) {
    setSelected({
      type: 'method',
      selectedName: methodName,
    });
  }

  function setAppSelected(appInfo) {
    setSelected({
      type: 'app',
      selectedName: appInfo,
    });
  }

  return (
    <div>
      <div>
        <Title>Our Tool — DeDigi</Title>
        <MethodBarContainer>
          <Subtitle onClick={() => setAppSelected('information')} isActive={selected.type === 'app'}>
            Information
          </Subtitle>
        </MethodBarContainer>
        <br />
      </div>
      <div>
        <Title>Tools</Title>
        <ToolBarContainer>
          {toolBarIcons.map(({ icon, iconName }) => (
            <IconContainer>
              <IconButton
                IconImg={icon}
                key={iconName}
                iconName={iconName}
                isHoverable
                isNotTransitioned
                onClick={() => setToolSelected(iconName.split('-')[0])}
                isActive={selected.type === 'tool' && iconName.split('-')[0] === selected.selectedName}
              />
            </IconContainer>
          ))}
        </ToolBarContainer>
        <br />
      </div>
      <div>
        <Title>Methods</Title>
        <MethodBarContainer>
          {methods.map(({ alt, methodName }) => (
            <Subtitle onClick={() => setMethodSelected(alt)} isActive={selected.type === 'method' && alt === selected.selectedName}>
              {methodName}
            </Subtitle>
          ))}
        </MethodBarContainer>
        <br />
      </div>
    </div>
  );
}
