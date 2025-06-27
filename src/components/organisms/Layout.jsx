import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '@/components/organisms/Sidebar';

const Layout = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="h-full p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;