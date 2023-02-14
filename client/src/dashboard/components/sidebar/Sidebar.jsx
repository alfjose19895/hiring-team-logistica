import { itemsData } from './itemsData';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <>
      <aside className="mt-3">
        <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full mt-6">
          <ul className="flex flex-col pl-0 mb-0">
            {itemsData.map(item => (
              <SidebarItem key={Math.random()} item={item} />
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
