import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div id="app-root" className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-amber-400 selection:text-neutral-950">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;