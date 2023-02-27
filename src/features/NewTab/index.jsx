import React from 'react';
import { render } from 'react-dom';

import NewTab from './NewTab';

render(<NewTab />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
