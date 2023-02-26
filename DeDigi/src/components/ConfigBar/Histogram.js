/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import styled from 'styled-components';

const HistogramContainer = styled.div`
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 20px;
  }
`;

const RedHistogram = styled.div`
  display: ${(props) => (props.currentHistogram === 'red' ? 'block' : 'none')};
`;

const GreenHistogram = styled.div`
  display: ${(props) => (props.currentHistogram === 'green' ? 'block' : 'none')};
`;

const BlueHistogram = styled.div`
  display: ${(props) => (props.currentHistogram === 'blue' ? 'block' : 'none')};
`;

export default function Histogram() {
  const [currentHistogram, setCurrentHistogram] = useState('red');
  function handleChange(e) {
    setCurrentHistogram(e.target.value);
  }

  return (
    <div>
      <select value={currentHistogram} onChange={handleChange}>
        <option value="red">Red Channel</option>
        <option value="green">Green Channel</option>
        <option value="blue">Blue Channel</option>
      </select>
      <HistogramContainer id="histograms">
        <RedHistogram id="red-histo" currentHistogram={currentHistogram} />
        <GreenHistogram id="green-histo" currentHistogram={currentHistogram} />
        <BlueHistogram id="blue-histo" currentHistogram={currentHistogram} />
      </HistogramContainer>
    </div>
  );
}
