import { Outlet } from 'react-router-dom';
import { Header } from '../dashboard/components/navbar/Header';
import Sidebar from '../dashboard/components/sidebar/Sidebar';

const PrivateLayout = () => {
  return (
    <div className="bg-gray-100">
      <Header />

      <div className="md:flex md:min-h-screen">
        <Sidebar />
        <main className="p-10 flex-1 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
