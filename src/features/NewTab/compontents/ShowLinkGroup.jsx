import React from 'react';
import { LinkGroup } from '../model';
import SimpleLink from './SimpleLink';

import './showLinkGroup.scss';

/**
 * @typedef { {
 *  group: LinkGroup
 * } } LinkGroupProps
 */

/**
 * @param {LinkGroupProps} props
 * @returns {JSX.Element}
 */
const ShowLinkGroup = (props) => {
  return (
    <div style={{ color: props.group.color, backgroundColor: props.group.backgroundColor }} className="groupBlock">
      <h4 className="groupHeadline">{props.group.label}</h4>
      <div className="groupContent">
        {props.group.links.map((link) => (
          <SimpleLink key={link.label} href={link.url} name={link.label} color={link.color} backgroundColor={link.backgroundColor} />
        ))}
        {props.group.linkGroups.map((linkGroup) => (
          <ShowLinkGroup key={linkGroup.label} group={linkGroup} />
        ))}
      </div>
    </div>
  );
};

export default ShowLinkGroup;
