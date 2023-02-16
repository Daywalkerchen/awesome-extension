import React, { memo, useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';

import './popup.scss';
import ErrorBoundary from '../../error-boundary/ErrorBoundary';

const Popup = (props) => {
  let popupIdCounter = 0;
  const open = false;

  const src = chrome.runtime.getURL('icon-28.png');

  const [isOpen, setIsOpen] = useState(open);
  const triggerRef = useRef(null);
  const popupId = useRef(`popup-${++popupIdCounter}`);
  const trigger = <img src={src} alt="better emotes" />;

  const [mousePos, setMousePos] = useState({});

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
    <div key="0" style={{ top: `${mousePos.y - 250}px`, left: `${mousePos.x}px` }} className="input-emote-picker popup-overlay popup">
      {props.children}
    </div>
  );

  useEffect(() => {
    renderTrigger();
    isOpen && render(content, window.document.querySelector('#popup-root'));
  }, []);

  return <div></div>;
};

export default memo(Popup);
