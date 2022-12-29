//region Imports
import React from 'react';
import ReactDOM from 'react-dom';
import EmotePickerOnInput from '../../../../components/emote-picker-on-input/emotePickerOnInput';
//endregion

export const componentName = 'EmotePickerOnChatBoxes';

export const initEmotePickerOnChatBoxes = () => {
  // currently, only rocket
  const emotePickerId = 'emote-picker';
  const container = document.getElementById(emotePickerId);
  if (container) {
    return;
  }

  const rcMessageBoxes = document.getElementsByClassName('rc-message-box__container');
  if (!rcMessageBoxes.length) {
    console.log(`[${componentName}] InputEmotePicker rc-message-box__container not found`);
    return;
  }

  const chatBoxWrapper = rcMessageBoxes[0];
  const chatBoxes = document.getElementsByClassName('rc-message-box__textarea');
  if (!chatBoxes.length) {
    console.log(`[${componentName}] InputEmotePicker rc-message-box__textarea not found`);
    return;
  }
  const chatBox = chatBoxes[0];
  const emotePicker = document.createElement('div');
  emotePicker.id = emotePickerId;
  chatBoxWrapper.prepend(emotePicker);

  ReactDOM.render(<EmotePickerOnInput inputElem={chatBox} />, document.getElementById(emotePickerId));
  console.log(`[${componentName}] injected`);
};
