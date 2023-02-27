import React from 'react';

import './simpleLink.scss';

/**
 * @typedef {{
 *   href: string;
 *   name: string;
 *   color?: string;
 *   backgroundColor?: string;
 * }} SimpleLinkProps
 */

/**
 * @param {SimpleLinkProps} props
 * @returns {JSX.Element}
 */
const SimpleLink = (props) => {
  return (
    <a className="simpleLink" href={props.href} style={{ color: props.color, backgroundColor: props.backgroundColor }}>
      {props.name}
    </a>
  );
};

export default SimpleLink;
