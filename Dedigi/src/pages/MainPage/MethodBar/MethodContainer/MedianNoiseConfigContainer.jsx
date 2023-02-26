import React, { useState } from 'react';
import Slider from '../../../../components/Slider';
import methods from '../../../../constants/methods';
import ConfigContainer from '../../ConfigContainer';

export default function MedianNoiseConfigContainer(props) {
  const { executeMethod } = props;
  const [value, setValue] = useState(3);
  const methodIdx = methods.findIndex((method) => method.alt === 'mediannoise');

  function execMethod(_paraName, val) {
    setValue(val);
    executeMethod('noisemedian', { nSize: val });
  }

  return (
    <div>
      <ConfigContainer title="method" subtitle={methods[methodIdx].methodName} tooltip={methods[methodIdx].tooltip}>
        <Slider paraName="nSize" min={0} max={10} step={1} defaultValue={value} onAfterChange={execMethod} title="Kernel size" />
      </ConfigContainer>
    </div>
  );
}
