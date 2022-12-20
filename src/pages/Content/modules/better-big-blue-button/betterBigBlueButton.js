export const componentName = 'BetterBigBlueButton';

const findShuffledUserNames = () => {
  const users = document.querySelectorAll('[data-test="userListItem"] div div span span, [data-test="userListItemCurrent"] div div span span');
  return [...users].map((it) => it.innerText.trim()).sort(() => 0.5 - Math.random());
};

const createDailySchedule = () => {
  const usernames = findShuffledUserNames();

  return ['Daily ' + new Date().toISOString().slice(0, 10) + ':', ':noted:', ...usernames, ':suss:', 'Nachbrenner'].join('\n');
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
