import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Learn } from './pages/Learn';
import { ModuleView } from './pages/ModuleView';
import { Lab } from './pages/Lab';
import { Practice } from './pages/Practice';
import { Revision } from './pages/Revision';
import { Progress } from './pages/Progress';
import { useStore } from './store/useStore';

function App() {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="learn" element={<Learn />} />
          <Route path="learn/:id" element={<ModuleView />} />
          <Route path="lab" element={<Lab />} />
          <Route path="practice" element={<Practice />} />
          <Route path="revision" element={<Revision />} />
          <Route path="progress" element={<Progress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
