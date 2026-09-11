import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './reference.css';
import './mobile-clarity.css';
import './components/tools/shared.css';
import './native-dialogs';
import './components/calculators/calculator-launcher';
import './components/tools/date-tools';
import './components/tools/time-tools';
import './components/tools/conversion-fixes';
import './components/tools/legacy-form-launcher';
import './game-fixes';
import './external-link-guard';
import './settings-enhancement';
import './settings-icons.css';
import './world-class.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
