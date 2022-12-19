import React from 'react';
import './Popup.scss';
import Header from './header/Header';
import Settings from './settings/Settings';
import EmotePicker from './emote-picker/EmotePicker';

const Popup = () => (
  <div className="popup">
    <Header />
    <Settings />
    <EmotePicker />
  </div>
);

export default Popup;
