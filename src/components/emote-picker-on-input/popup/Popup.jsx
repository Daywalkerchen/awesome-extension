import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';

import './popup.scss';

const Popup = ({ children }) => {
  let popupIdCounter = 0;
  const open = false;

  const src = chrome.runtime.getURL('icon-28.png');

  const [isOpen, setIsOpen] = useState(open);
  const triggerRef = useRef(null);
  const popupId = useRef(`popup-${++popupIdCounter}`);
  const trigger = <img src={src} alt="better emotes" />;

  let PopupRoot;

  PopupRoot = document.createElement('div');
  PopupRoot.setAttribute('id', 'popup-root');
  document.body.appendChild(PopupRoot);

  const openPopup = () => {
    if (isOpen) {
      return;
    }
    setIsOpen(true);
  };

  const closePopup = () => {
    if (!isOpen) {
      return;
    }
    setIsOpen(false);
  };

  // const getRootPopup = () => {
  //   let PopupRoot;
  //
  //   PopupRoot = document.createElement('div');
  //   PopupRoot.setAttribute('id', 'popup-root');
  //   document.body.appendChild(PopupRoot);
  //
  //   return PopupRoot;
  // };

  const togglePopup = (event) => {
    event?.stopPropagation();

    if (!isOpen) {
      openPopup(event);
    } else {
      closePopup(event);
    }
  };

  const renderTrigger = () => {
    const triggerProps = {
      key: 'T',
      ref: triggerRef,
      'aria-describedby': popupId.current,
    };

    triggerProps.onClick = togglePopup;

    return !!trigger && React.cloneElement(trigger, triggerProps);
  };

  const content = (
    <div key="0" className="input-emote-picker popup-overlay popup">
      {children}
    </div>
  );
  return (
    <>
      {renderTrigger()}
      {isOpen && render(content, window.document.querySelector('#popup-root'))}
    </>
  );
};

export default Popup;
