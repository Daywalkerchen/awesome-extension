import React from 'react';
import Panel from './Panel';
import './index.css';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app-container');
const root = createRoot(container);

root.render(<Panel />);
