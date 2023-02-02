//region Imports
import React from 'react';
import { createRoot } from 'react-dom/client';
import EmotePickerOnInput from '../../../../components/emote-picker-on-input/EmotePickerOnInput';
import './emotePickerOnChatBoxes.scss';
//endregion

//region Constants
export const componentName = 'EmotePickerOnChatBoxes';
//endregion

export const initEmotePickerOnChatBoxes = () => {
  // currently, only rocket
  const emotePickerId = 'emote-picker';
  const container = document.getElementById(emotePickerId);

  if (container) {
    return;
  }

  if (document.URL.startsWith('https://rocket.')) {
    const rcMessageBoxes = document.getElementsByClassName('rc-message-box__container');

    if (!rcMessageBoxes.length) {
      console.log(`[${componentName}] InputEmotePicker rc-message-box__container not found`);
      return;
    }

    const chatBoxWrapper = rcMessageBoxes[0];
    const chatBoxes = document.getElementsByClassName('rc-message-box__textarea');

    if (!chatBoxes.length) {
      console.log(`[${componentName}] InputEmotePicker rc-message-box__textarea not found`);

      return null;
    }

    const chatBox = chatBoxes[0];
    const emotePicker = document.createElement('div');

    emotePicker.id = emotePickerId;
    chatBoxWrapper.prepend(emotePicker);

    const container = document.getElementById('emotePickerId');
    const root = createRoot(container);

    root.render(<EmotePickerOnInput inputElem={chatBox} />);

    console.log(`[${componentName}] injected`);
  }

  if (document.URL.startsWith('https://conference.flavia-it.')) {
    const bbbMessageBoxes = document.getElementsByClassName('sc-hYfoSM lePtnL');

    if (!bbbMessageBoxes.length) {
      console.log(`[${componentName}] InputEmotePicker sc-hYfoSM lePtnL not found`);
      return;
    }

    const chatBoxWrapper = bbbMessageBoxes[0];
    const chatBox = document.getElementById('message-input');

    if (!chatBox) {
      console.log(`[${componentName}] InputEmotePicker message-input not found`);

      return null;
    }

    const emotePicker = document.createElement('div');

    emotePicker.id = emotePickerId;
    chatBoxWrapper.append(emotePicker);

    const container = document.getElementById('emotePickerId');
    const root = createRoot(container);

    root.render(<EmotePickerOnInput inputElem={chatBox} />);

    console.log(`[${componentName}] injected`);
  }
};
