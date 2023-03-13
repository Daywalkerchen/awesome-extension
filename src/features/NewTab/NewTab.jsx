import React, { useEffect, useRef, useState } from 'react';
import ShowLinkGroup from './compontents/ShowLinkGroup';
import { useEventListener } from '../../hooks/event';
import { LinkGroup } from './model.ts';
import { fillOptionalFieldsWithDefaults } from './link-group.service';
import { useLocalStorage } from '../../hooks/storage';

import './newTab.scss';

/**
 * @param {LinkGroup[]} linkGroups
 * @param {string} search
 * @returns {LinkGroup[]}
 */
const filterGroups = (linkGroups, search) => {
  return linkGroups.flatMap((group) => {
    if (group.label.toLowerCase().includes(search)) {
      return [group];
    }
    const filtered = filterGroups(group.linkGroups, search);
    if (filtered.length > 0) {
      return [{ ...group, linkGroups: filtered }];
    }
    const links = group.links.filter((link) => link.label.toLowerCase().includes(search));
    if (links.length > 0) {
      return [{ ...group, links: links }];
    }
    return [];
  });
};

const NewTab = () => {
  const [rawLinkGroups] = useLocalStorage('linkGroups', []);
  const htmlElRef = useRef(null);
  const [search, setSearch] = useState('');

  const linkGroups = fillOptionalFieldsWithDefaults(rawLinkGroups ?? []);

  useEffect(() => {
    if (htmlElRef.current) {
      setSearch(htmlElRef.current.value);
    }
  }, [htmlElRef]);

  useEventListener('keydown', (event) => {
    if (event.code.startsWith('Key')) {
      htmlElRef?.current?.focus();
    }
  });

  return (
    <div className="newTab">
      <div className="searchContainer">
        <input
          onChange={(event) => setSearch(event.target.value.toLowerCase())}
          className="search"
          autoFocus
          type="text"
          ref={htmlElRef}
          placeholder="Search"></input>
      </div>
      <div>
        {filterGroups(linkGroups, search).map((group) => (
          <ShowLinkGroup key={group.label} group={group} />
        ))}
      </div>
    </div>
  );
};

export default NewTab;
