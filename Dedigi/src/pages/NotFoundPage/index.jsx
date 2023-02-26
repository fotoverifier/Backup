import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../constants/colors';

const NotFoundContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;

  a {
    color: ${colors.lightaqua};
    margin-left: 0.5rem;
  }
`;

export default function NotFoundPage(props) {
  const { resetError } = props;
  return (
    <NotFoundContainer>
      <h2>An error has occured, please return to the homepage</h2>
      <FlexContainer>
        <h3>Access the Homepage directly at </h3>
        {resetError ? (
          <Link to="/" onClick={resetError}>
            https://dedigi.herokuapp.com
          </Link>
        ) : (
          <Link to="/">https://dedigi.herokuapp.com</Link>
        )}
      </FlexContainer>
    </NotFoundContainer>
  );
}
