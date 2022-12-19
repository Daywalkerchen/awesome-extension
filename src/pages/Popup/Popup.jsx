import React from 'react';
import './Popup.scss';
import Header from './header/Header';
import Settings from './settings/Settings';

const Popup = () => (
  <div className="popup">
    <Header />
    <Settings />
  </div>
);

export default Popup;
