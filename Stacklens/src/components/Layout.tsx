import { useLocation, Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const [renderKey, setRenderKey] = useState(location.pathname);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      setRenderKey(location.pathname);
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 relative grain-overlay">
          <div
            key={renderKey}
            className="page-enter-active h-full"
          >
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
