import React, { useState } from 'react';
import Slider from '../../../../components/Slider';
import methods from '../../../../constants/methods';
import ConfigContainer from '../../ConfigContainer';

export default function ELAConfigContainer(props) {
  const { executeMethod } = props;
  const [parameters, setParameters] = useState({
    quality: 0.75,
    errorScale: 10,
  });
  const { quality, errorScale } = parameters;
  const methodIdx = methods.findIndex((method) => method.alt === 'ela');

  function execMethod() {
    executeMethod('ela', parameters);
  }

  function logErrorScale(paraName, value) {
    setParameters(
      {
        ...parameters,
        [paraName]: value,
      },
      execMethod()
    );
  }

  return (
    <div>
      <ConfigContainer title="method" subtitle={methods[methodIdx].methodName} tooltip={methods[methodIdx].tooltip}>
        <Slider paraName="quality" min={0} max={1} step={0.01} defaultValue={quality} onAfterChange={logErrorScale} title="JPEG Quality" />
        <Slider paraName="errorScale" min={0} max={50} step={1} defaultValue={errorScale} onAfterChange={logErrorScale} title="Error Scale" />
      </ConfigContainer>
    </div>
  );
}
