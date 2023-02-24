import React from 'react';
import { useSelector } from 'react-redux';
import ImageContainer from './ImageContainer';
import ImageLineContainer from './ImageLineContainer';

export default function MainPage() {
  const { tool } = useSelector((state) => state.toolReducer);

  return (
    <>
      {/* Image Container */}
      {tool.name === 'line' ? <ImageLineContainer /> : <ImageContainer />}
    </>
  );
}
