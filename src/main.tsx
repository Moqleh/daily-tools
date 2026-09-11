import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './reference.css';
import './mobile-clarity.css';
import './components/tools/shared.css';
import './native-dialogs';
import './components/tools/legacy-form-launcher';
import './components/tools/conversion-fixes';
import './game-fixes';
import './components/calculators/calculator-launcher';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
