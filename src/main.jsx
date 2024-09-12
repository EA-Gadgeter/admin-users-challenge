import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { NextUIProvider } from '@nextui-org/react';

import { AuthContextProvider } from "./context/authContext";

import { AuthValidator } from "./components/auth";

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <NextUIProvider>
        <AuthValidator />
      </NextUIProvider>
    </AuthContextProvider>
  </StrictMode>,
);
