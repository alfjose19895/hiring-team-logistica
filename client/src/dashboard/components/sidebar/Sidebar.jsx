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
      <aside className="mt-3">
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
