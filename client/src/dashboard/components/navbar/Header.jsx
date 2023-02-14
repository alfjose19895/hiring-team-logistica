import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../hooks';

export const Header = () => {
  const { user, startLogout } = useAuthStore();

  const handleLogout = () => {
    startLogout();
  };

  return (
    <header className="px-8 py-5 bg-white border-b">
      <div className="md:flex md:justify-between items-center">
        <h2 className="text-lg  font-black text-center mb-5 md:mb-0 text-slate-700">
          <Link to="/dashboard"> Some Dashboard</Link>
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <span>{user.fullName}</span>

          <button
            type="button"
            className="text-white text-sm p-3 rounded-md bg-slate-700 uppercase font-bold"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
};
