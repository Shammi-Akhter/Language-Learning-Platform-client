import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Root from './Layout/Root.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './Components/Home/Home.jsx';
import { ThemeProvider } from './Theme.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />

      },
      // {
      //   path: '/',
      //   element: ,

      // },

    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeProvider>

        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </AuthProvider>
     
    </ThemeProvider>
  </StrictMode>,
)
