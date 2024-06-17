/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import ToggleTheme from './ToggleTheme';
import Logout from './Logout';
import HideSidebar from './HideSidebar';
import useDatabaseContext from '../hooks/useDatabaseContext';
import ListOfBoards from './ListOfBoards';

function Sidebar({ showSidebar, setShowSidebar }) {
  const { boards } = useDatabaseContext();
  const [hideSidebar, setHideSidebar] = useState(!!localStorage.getItem('hideSidebar'));

  const handleCloseModalSidebar = (e) => {
    if (e.target.ariaLabel === 'sidebar-modal') {
      setShowSidebar(!showSidebar);
    }
  };

  return (
    <aside
      className={` 
        ${showSidebar
        ? 'grid place-items-center bg-black/50 absolute w-full lg:flex lg:static lg:place-items-end z-10'
        : 'hidden lg:flex'}
        ${hideSidebar
          ? 'lg:w-[0vw]'
          : 'lg:flex lg:w-[20vw]'} 
        top-0 left-0 h-full
      `}
      aria-label="sidebar-modal"
      onClick={handleCloseModalSidebar}
    >
      <div className="bg-white dark:bg-slate-800 rounded-xl w-11/12 md:w-4/5 pb-4 lg:w-full lg:h-full lg:rounded-none lg:flex lg:flex-col lg:justify-between">
        <div className="pt-4">
          <h2 className="uppercase text-gray-500 font-semibold ml-6 text-sm tracking-widest overflow-hidden">
            {`All boards (${boards?.length})`}
          </h2>

          <div
            className={`overflow-y-scroll scrollbar-hide ${hideSidebar && 'lg:overflow-hidden'}`}
          >
            <ListOfBoards />
          </div>
        </div>

        <div className={`w-full mt-4 lg:mt-0 lg:flex lg:flex-col lg:justify-end ${hideSidebar && 'lg:overflow-hidden'}`}>

          <HideSidebar hideSidebar={hideSidebar} setHideSidebar={setHideSidebar} />

          <div className="flex justify-center mb-4 lg:hidden">
            <Logout />
          </div>

          <div className="px-4">
            <ToggleTheme />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
