/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'rc-slider/assets/index.css';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import TutorialPage from './pages/TutorialPage';

import injectScript from './utils/injectScript';
import MainLayoutTemplate from './HOC/MainLayout';
import LoaderContainer from './components/LoaderContainer';

function App() {
  const [cvState, setCvState] = useState(false);
  const [npState, setNpState] = useState(false);
  function onOpenCvReady() {
    setCvState(true);
  }

  function onNumpyReady() {
    setNpState(true);
  }

  useEffect(() => {
    async function fetchLib() {
      await injectScript('opencv-injected-js', '/assets/lib/opencv.js')
        .then(() => onOpenCvReady())
        .catch(() => console.log('Error loading dependencies, please refresh'));
      await injectScript('numpy-injected-js', '/assets/lib/numjs.min.js')
        .then(() => onNumpyReady())
        .catch(() => console.log('Error loading dependencies, please refresh'));
    }
    fetchLib();
  }, []);

  if (!cvState || !npState) return <LoaderContainer />;

  return (
    <BrowserRouter>
      <Switch>
        <MainLayoutTemplate exact path="/tutorial/:methodId?" Component={TutorialPage} />
        <MainLayoutTemplate exact path="/" Component={MainPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
