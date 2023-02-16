// region Imports
import React, { memo, useRef, useState } from 'react';

import './popup.scss';
import ErrorBoundary from '../../error-boundary/ErrorBoundary';
// endregion

const Popup = (props) => {
  let popupIdCounter = 0;

  const src = chrome.runtime.getURL('icon-28.png');

  const [isOpen, setIsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({});

  const triggerRef = useRef(null);
  const popupId = useRef(`popup-${++popupIdCounter}`);

  const handleMouseMove = (event) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

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

  const togglePopup = (event) => {
    const targetBounds = event.target.getBoundingClientRect();

    setMousePos(targetBounds);

    event?.stopPropagation();

    if (!isOpen) {
      openPopup(event);
    } else {
      closePopup(event);
    }
  };

  const overlay = (
    <div key="0" style={{ top: `${mousePos.y - 258}px`, left: `${mousePos.x}px` }} className="popup">
      <div className="popup__content">{props.children}</div>
    </div>
  );

  return (
    <ErrorBoundary>
      {isOpen && overlay}
      <img src={src} alt="better emotes" key="T" ref={triggerRef} aria-describedby={popupId.current} onClick={togglePopup} />
    </ErrorBoundary>
  );
};

export default memo(Popup);
