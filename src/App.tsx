import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { WatchPage } from './pages/WatchPage';
import { UploadPage } from './pages/UploadPage';
import { AuthProvider } from './contexts/AuthContext';
import { cn } from './lib/utils';

import { useState } from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isWatchPage = location.pathname.startsWith('/watch');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex pt-16">
        {!isWatchPage && (
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
        )}
        <main className={cn(
          "flex-1 min-h-[calc(100vh-4rem)] w-full",
          !isWatchPage && "md:ml-60"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}

import { ProfilePage } from './pages/ProfilePage';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-gray-500 mb-6">Page not found or coming soon.</p>
      <a href="/" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
        Go Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
