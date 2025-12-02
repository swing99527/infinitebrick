import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { StudioPage } from './pages/StudioPage';
import { CommunityPage } from './pages/CommunityPage';
import { ModelDetailPage } from './pages/ModelDetailPage';
import { DashboardPage } from './pages/DashboardPage';

// 设置默认的 HTML head 元素
function DefaultHead() {
  useEffect(() => {
    // 设置 favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.setAttribute('type', 'image/svg+xml');
    link.setAttribute('rel', 'icon');
    link.setAttribute('href', '/public/favicon.svg');
    if (!document.querySelector("link[rel*='icon']")) {
      document.head.appendChild(link);
    }

    // 设置 Apple touch icon
    const appleTouchIcon = document.querySelector("link[rel='apple-touch-icon']") || document.createElement('link');
    appleTouchIcon.setAttribute('rel', 'apple-touch-icon');
    appleTouchIcon.setAttribute('href', '/public/logo192.png');
    if (!document.querySelector("link[rel='apple-touch-icon']")) {
      document.head.appendChild(appleTouchIcon);
    }

    // 设置 manifest
    const manifest = document.querySelector("link[rel='manifest']") || document.createElement('link');
    manifest.setAttribute('rel', 'manifest');
    manifest.setAttribute('href', '/public/manifest.json');
    if (!document.querySelector("link[rel='manifest']")) {
      document.head.appendChild(manifest);
    }

    // 设置 theme-color
    const themeColor = document.querySelector("meta[name='theme-color']") || document.createElement('meta');
    themeColor.setAttribute('name', 'theme-color');
    themeColor.setAttribute('content', '#FFD700');
    if (!document.querySelector("meta[name='theme-color']")) {
      document.head.appendChild(themeColor);
    }

    // 设置 viewport (如果还没有)
    if (!document.querySelector("meta[name='viewport']")) {
      const viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      document.head.appendChild(viewport);
    }
  }, []);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <DefaultHead />
          <div className="min-h-screen bg-[#000000] dark">
            <Routes>
              
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/community/:id" element={<ModelDetailPage />} />

              {/* Protected Routes */}
              <Route 
                path="/studio" 
                element={
                  <ProtectedRoute>
                    <StudioPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/dashboard/*" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </div>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}