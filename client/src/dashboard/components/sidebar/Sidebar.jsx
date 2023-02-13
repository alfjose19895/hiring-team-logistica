import React from 'react';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const items = [
    { title: 'Dashboard', path: 'dashboard', icon: 'fa-tachometer' },
    {
      title: 'Products',
      path: 'dashboard/products',
      icon: 'fa-shopping-basket',
    },
    { title: 'Users', path: 'dashboard/users', icon: 'fa-users' },
  ];

  return (
    <>
      <aside className="">
        <div className="">
          <span className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700">
            <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">
              Some Dashboard
            </span>
          </span>
        </div>
        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

        <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full mt-6">
          <ul className="flex flex-col pl-0 mb-0">
            {items.map(item => (
              <SidebarItem key={Math.random()} item={item} />
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
