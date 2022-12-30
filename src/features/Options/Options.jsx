// region Imports
import React from 'react';
import './options.scss';
import Settings from './settings/Settings';
import Header from '../../components/header/Header';
// endregion

const Options = () => (
  <div className="options">
    <div className="content">
      <Header />
      <Settings />
    </div>
  </div>
);

export default Options;
