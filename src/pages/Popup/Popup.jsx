import React from 'react';
import './Popup.scss';
import Header from '../../components/header/Header';
import EmotePicker from './emote-picker/EmotePicker';

const Popup = () => (
  <div className="popup">
    <Header />
    <EmotePicker />
  </div>
);

export default Popup;
