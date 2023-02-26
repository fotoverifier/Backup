import React from 'react';
import styled from 'styled-components';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import colors from '../constants/colors';

const SliderContainer = styled.div`
  width: 75%;
  margin-bottom: 0rem;
`;

const Title = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: ${colors.lightjean};
`;

const SliderInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function CustomSlider(props) {
  const { onAfterChange, defaultValue, paraName, title, min, max, step } = props;
  const SliderWithTooltip = createSliderWithTooltip(Slider);

  function handleAfterChange(value) {
    onAfterChange(paraName, value);
  }

  return (
    <SliderContainer>
      {title && <Title>{title}</Title>}
      <SliderInfo>
        <SliderWithTooltip
          min={min}
          max={max}
          step={step}
          railStyle={{ backgroundColor: colors.lightjean }}
          trackStyle={{ backgroundColor: colors.primary }}
          handleStyle={{
            borderColor: colors.primary,
            backgroundColor: colors.primary,
          }}
          tipProps={{ overlayClassName: 'foo' }}
          defaultValue={defaultValue}
          onAfterChange={handleAfterChange}
        />
      </SliderInfo>
    </SliderContainer>
  );
}
