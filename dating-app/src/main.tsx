import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

import LoginPage from './pages/LoginPage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import OtpPage from './pages/OtpPage.tsx'
import HomePage from './pages/HomePage.tsx'
import ProfileEditPage from './pages/ProfileEditPage.tsx'
import DiscoverPage from './pages/DiscoverPage.tsx'
import MatchesPage from './pages/MatchesPage.tsx'
import ChatPage from './pages/ChatPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'otp', element: <OtpPage /> },
      { path: 'profile', element: <ProfileEditPage /> },
      { path: 'discover', element: <DiscoverPage /> },
      { path: 'matches', element: <MatchesPage /> },
      { path: 'chat/:id', element: <ChatPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
