import React from 'react';
import Slider from '../../../../components/Slider';
import methods from '../../../../constants/methods';
import ConfigContainer from '../../ConfigContainer';

export default function GhostConfigContainer(props) {
  const { executeMethod } = props;
  const methodIdx = methods.findIndex((method) => method.alt === 'ghost');

  function execMethod(_paraName, value) {
    executeMethod('ghost', { quality: value });
  }

  return (
    <div>
      <ConfigContainer title="method" subtitle={methods[methodIdx].methodName} tooltip={methods[methodIdx].tooltip}>
        <Slider paraName="jpegQuality" min={0} max={1.0} step={0.01} defaultValue={0.75} onAfterChange={execMethod} title="JPEG Quality" />
      </ConfigContainer>
    </div>
  );
}
