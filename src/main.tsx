import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './reference.css';
import './mobile-clarity.css';
import './native-dialogs';
import './game-fixes';
import './components/calculators/calculator-launcher';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
