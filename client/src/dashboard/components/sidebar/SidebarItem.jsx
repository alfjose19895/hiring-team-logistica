import { Link } from 'react-router-dom';

const SidebarItem = ({ item }) => {
  return (
    <li className="mt-3 w-full">
      <Link
        className="py-3 shadow-sm text-sm  my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors"
        to={`/${item.path}`}
      >
        <div className="bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
          <i className={`fa ${item.icon} text-white`} aria-hidden="true"></i>
        </div>
        <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
          {item.title}
        </span>
      </Link>
    </li>
  );
};

export default SidebarItem;
