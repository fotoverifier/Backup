import React, { useState } from 'react';
import Slider from '../../../../components/Slider';
import methods from '../../../../constants/methods';
import ConfigContainer from '../../ConfigContainer';

export default function CFAConfigContainer(props) {
  const { executeMethod } = props;
  const [value, setValue] = useState(1);
  const methodIdx = methods.findIndex((method) => method.alt === 'artifact');

  function execMethod(_paraName, val) {
    setValue(val);
    executeMethod('demosaicing', { weight: val });
  }

  return (
    <div>
      <ConfigContainer title="method" subtitle={methods[methodIdx].methodName} tooltip={methods[methodIdx].tooltip}>
        <Slider paraName="weight" min={0} max={5} step={0.5} defaultValue={value} onAfterChange={execMethod} title="Weight" />
      </ConfigContainer>
    </div>
  );
}
