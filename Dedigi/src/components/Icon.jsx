import React from 'react';

export default function Icon(props) {
  const { IconImg, onClick, isHoverable } = props;
  IconImg.defaultProps = {
    size: 24,
    style: {},
    className: '',
  };

  if (isHoverable) {
    return <IconImg onClick={onClick} />;
  }

  return <IconImg />;
}
