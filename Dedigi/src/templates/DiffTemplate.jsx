import React from 'react';
import HorizontalDiffView from '../components/Utility/HorizontalDiffView';
import SideDiffView from '../components/Utility/SideDiffView';
import VerticalDiffView from '../components/Utility/VerticalDiffView';

const sideBySideTemplate = ({ getCurrentImage, alt }) => {
  return <SideDiffView getCurrentImage={getCurrentImage} alt={alt} />;
};

const horizontalTemplate = () => {
  return <HorizontalDiffView />;
};

const verticalTemplate = () => {
  return <VerticalDiffView />;
};

export { sideBySideTemplate, horizontalTemplate, verticalTemplate };
