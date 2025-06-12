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
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './Components/Routes/PrivateRoute.jsx';
import TutorDetailsPage from './Components/TutorDetailsPage/TutorDetailsPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />

      },
     {
        path: '/login',
        element:
          <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/tutor-details-page/:id',
        element: (
          <PrivateRoute>
            <TutorDetailsPage/>
          </PrivateRoute>
        )
      },

    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeProvider>
<HelmetProvider>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </AuthProvider>
     </HelmetProvider>
    </ThemeProvider>
  </StrictMode>,
)
