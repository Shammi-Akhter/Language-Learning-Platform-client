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
import Category from './Components/Category/Category.jsx';
import FindTutorsCategory from './Components/FindTutorsCategory/FindTutorsCategory.jsx';
import TutorDetails from './Components/TutorDetailsPage/TutorDetailsPage.jsx';
import MyBookedTutor from './Components/MyBookedTutor/MyBookedTutor.jsx';
import AddTutorial from './Components/AddTutorial/AddTutorial.jsx';
import MyTutorials from './Components/MyTutorials/MyTutorials.jsx';
import AboutUs from './Components/About Us/AboutUs.jsx';
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy.jsx';
import Contact from './Components/Contact/Contact.jsx';
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx';
import FindTutors from './Components/FindTutors/FindTutors.jsx';
import TutorialDetails from './Components/TutorialsDetails/TutorialsDetails.jsx';

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
        path: '/category',
        element: <Category />
      },
      {
        path: '/tutors-category/:category',
        element: (
          <PrivateRoute>
            <FindTutorsCategory />
          </PrivateRoute>
        )
      },
      {
        path: '/my-booked-tutors',
        element: (
          <PrivateRoute>
            <MyBookedTutor />
          </PrivateRoute>
        )
      },
      {
        path: '/add-tutorials',
        element: (
          <PrivateRoute>
            <AddTutorial />
          </PrivateRoute>
        )
      },
      {
        path: '/tutor-details/:id',
        element: (
          <PrivateRoute>
            <TutorDetails />
          </PrivateRoute>
        )
      },
      {
        path: '/tutorial-details/:id',
        element: (
              <PrivateRoute>
          <TutorialDetails/>
          </PrivateRoute>
        )
      },
      {
        path: '/my-tutorials',
        element: (
          <PrivateRoute>
            <MyTutorials />
          </PrivateRoute>
        )
      },
      {
        path: '/about-us',
        element: <AboutUs />
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/find-tutors",
        element: <FindTutors/>
      },
      


    ],
    errorElement: <ErrorPage />
  },
  {
    path: '*',
    element: <ErrorPage />
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
