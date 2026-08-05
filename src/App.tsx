import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppErrorBoundary, LoadingState } from './components/ui/States';
import { useStore } from './store/useStore';
import { Capacitor } from '@capacitor/core';

const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const Learn = lazy(() => import('./pages/Learn').then((module) => ({ default: module.Learn })));
const ModuleView = lazy(() => import('./pages/ModuleView').then((module) => ({ default: module.ModuleView })));
const Lab = lazy(() => import('./pages/Lab').then((module) => ({ default: module.Lab })));
const Practice = lazy(() => import('./pages/Practice').then((module) => ({ default: module.Practice })));
const Revision = lazy(() => import('./pages/Revision').then((module) => ({ default: module.Revision })));
const Progress = lazy(() => import('./pages/Progress').then((module) => ({ default: module.Progress })));
const Login = lazy(() => import('./pages/Login').then((module) => ({ default: module.Login })));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  const theme = useStore((state) => state.theme);
  const reducedMotion = useStore((state) => state.reducedMotion);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = reducedMotion ? 'true' : 'false';
  }, [reducedMotion]);

  const routerBasename = Capacitor.isNativePlatform() ? '' : import.meta.env.DEV ? '' : '/SOLID-STATE-CHEMISTRY/';

  return (
    <BrowserRouter basename={routerBasename}>
      <AppErrorBoundary>
        <Suspense fallback={<LoadingState />}>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Home />} />
            <Route path="learn" element={<Learn />} />
            <Route path="learn/:id" element={<ModuleView />} />
            <Route path="lab" element={<Lab />} />
            <Route path="practice" element={<Practice />} />
            <Route path="revision" element={<Revision />} />
            <Route path="progress" element={<Progress />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AppErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
