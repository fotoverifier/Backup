import React, { useState } from 'react';
import styled from 'styled-components';
import TutorialBar from './TutorialBar';
import ToolTutorial from './Tutorials/Tools/ToolTutorial';
import MethodTutorial from './Tutorials/Methods/MethodTutorial';
import AppDescription from './AppDescription';

const TutorialContainer = styled.div`
  display: flex;
  width: 100%;
`;

const TutorialPageContainer = styled.div`
  padding: 1rem 1rem 1rem 1.5rem;
  max-height: 100vh;
  overflow: scroll;
  width: 100%;
`;

export default function TutorialPage() {
  const [selected, setSelected] = useState({
    type: 'app',
    selectedName: 'information',
  });

  return (
    <TutorialContainer>
      <TutorialBar selected={selected} setSelected={setSelected} />
      <TutorialPageContainer>
        {selected?.type === 'tool' && <ToolTutorial toolAlt={selected.selectedName} />}
        {selected?.type === 'method' && <MethodTutorial methodAlt={selected.selectedName} />}
        {selected?.type === 'app' && <AppDescription />}
      </TutorialPageContainer>
    </TutorialContainer>
  );
}
