/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import * as Sentry from '@sentry/react';
import { useSelector } from 'react-redux';
import ToolBar from '../components/ToolBar';
import MethodBar from '../pages/MainPage/MethodBar';
import ConfigBar from '../components/ConfigBar';
import NotFoundPage from '../pages/NotFoundPage';
import LoaderContainer from '../components/LoaderContainer';

const PageContainer = styled.div`
  display: flex;
  position: relative;
  // height: fit-content;
  min-height: 100vh;
  justify-content: ${(props) => (props.pathname === '/' ? 'space-between' : '')};
`;

const LeftSideBar = styled.div`
  display: flex;
  top: 0;
  left: 0;
  // height: fit-content;
  min-height: 100vh;
`;

const RightSideBar = styled.div`
  top: 0;
  right: 0;
  min-height: 100%;
`;

function LayoutTemplate(props) {
  const { location } = props;
  const { isLoading } = useSelector((state) => state.methodReducer);
  return (
    <PageContainer pathname={location?.pathname || '/'}>
      {isLoading ? <LoaderContainer /> : <></>}
      <LeftSideBar>
        <ToolBar />
        {location.pathname === '/' ? <MethodBar /> : <></>}
      </LeftSideBar>
      {props.children}
      {location.pathname === '/' ? (
        <RightSideBar>
          <ConfigBar />
        </RightSideBar>
      ) : (
        <></>
      )}
    </PageContainer>
  );
}

export default function MainLayoutTemplate({ Component, ...props }) {
  const location = useLocation();

  return (
    <Route
      {...props}
      render={(propsComponent) => (
        <Sentry.ErrorBoundary fallback={({ resetError }) => <NotFoundPage resetError={resetError} />}>
          <LayoutTemplate location={location}>
            <Component {...propsComponent} />
          </LayoutTemplate>
        </Sentry.ErrorBoundary>
      )}
    />
  );
}
