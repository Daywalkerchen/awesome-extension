//region Imports
import seedrandom from 'seedrandom';
//endregion

//region Constants
export const componentName = 'BetterBigBlueButton';
//endregion

const randomizeArray = (rngGen, array) => {
  return array
    .map((value) => ({ value, sort: rngGen() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const findShuffledUserNames = (rngGen) => {
  const users = document.querySelectorAll(
    '[data-test="userListItem"] div div span span[position="bottom"], [data-test="userListItemCurrent"] div div span span[position="bottom"]'
  );

  const sorted = [...users].map((it) => it.innerText.trim()).sort();

  return randomizeArray(rngGen, sorted);
};

const createDailySchedule = () => {
  const day = new Date().toISOString().slice(0, 10);
  const rngGen = seedrandom(day);

  const usernames = findShuffledUserNames(rngGen);

  return ['Daily ' + day + ':', ':noted:', ...usernames, ':suss:', 'Nachbrenner'].join('\n');
};

export const insertDailySchedule = () => {
  const messageInput = document.getElementById('message-input');

  if (!messageInput) {
    console.error(`[${componentName}] Unable to find message-input, we are probably not in a bbb conference`);
    return;
  }

  messageInput.value = createDailySchedule();

  // Dispatch change event, so that the bbb code accepts our input as valid
  messageInput.dispatchEvent(new window.Event('change', { bubbles: true }));
};
