import React from 'react';
import webpackImage from '../assets/webpack.png';
import webpackSVG from '../assets/webpack.svg';
import './App.scss';

const App = () => {
  return (
    <div>
      <h1>Webpack 5 learn</h1>
      <p>Image</p>
      <img src={webpackImage} alt="webpack-image" />
      <p>SVG</p>
      <img src={webpackSVG} alt="webpack-svg" />
    </div>
  );
};

export default App;
