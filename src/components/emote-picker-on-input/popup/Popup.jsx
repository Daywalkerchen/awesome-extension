// region Imports
import React, { memo, useEffect, useRef, useState } from 'react';

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

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          event?.stopPropagation();

          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

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
    <div ref={wrapperRef} key="0" style={{ top: `${mousePos.y - 340}px`, left: `${mousePos.x}px` }} className="popup">
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
