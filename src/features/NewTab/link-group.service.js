import { LinkGroup } from './model.ts';
import tinycolor from 'tinycolor2';

/**
 * @param {LinkGroup[]} linkGroups
 * @returns {LinkGroup[]}
 */
export const fillOptionalFieldsWithDefaults = (linkGroups) => {
  linkGroups.forEach((group) => {
    fillColor(group);
    fillOptionalFieldsWithDefaults(group.linkGroups);
  });
  return linkGroups;
};

/**
 * @param {LinkGroup} group
 * @returns {void}
 */
const fillColor = (group) => {
  if (group.color === void 0 && group.backgroundColor !== void 0) {
    const color = tinycolor(group.backgroundColor);
    if (color.isDark()) {
      group.color = 'white';
    } else {
      group.color = 'black';
    }
  }
};
