/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import ToggleTheme from './ToggleTheme';

function Sidebar({ showSidebar, setShowSidebar }) {
  const [hideSidebar, setHideSidebar] = useState(!!localStorage.getItem('hideSidebar'));

  const handleCloseModalSidebar = (e) => {
    if (e.target.ariaLabel === 'sidebar-modal') {
      setShowSidebar(!showSidebar);
    }
  };

  const handleHideSidebar = () => {
    if (hideSidebar) {
      setHideSidebar(false);
      localStorage.removeItem('hideSidebar');
    } else {
      setHideSidebar(true);
      localStorage.setItem('hideSidebar', 'true');
    }
  };

  return (
    <aside
      className={` 
        ${showSidebar
        ? 'grid place-items-center bg-black/50 absolute w-full lg:block lg:static lg:place-items-end'
        : 'hidden lg:block'}
        ${hideSidebar
          ? 'lg:w-[0vw]'
          : 'lg:block lg:w-[20vw]'} 
        top-0 left-0 h-screen
      `}
      aria-label="sidebar-modal"
      onClick={handleCloseModalSidebar}
    >
      <div className="bg-white dark:bg-slate-800 rounded-xl w-4/5 py-4 lg:w-full lg:h-screen lg:rounded-none lg:flex lg:flex-col lg:justify-between lg:pt-16">
        <h2 className="uppercase text-gray-500 font-semibold ml-6 text-sm tracking-widest lg:mt-6 lg:mb-2 overflow-hidden">
          All boards
        </h2>

        <div className={`lg:h-1/2 overflow-y-scroll scrollbar-hide ${hideSidebar && 'lg:overflow-hidden'}`}>
          <ul>
            <li>Prueba</li>
            <li>Prueba 2</li>
            <li>Prueba 3</li>
          </ul>
        </div>

        <div className={`w-full mt-4 lg:mt-0 lg:h-1/2 lg:flex lg:flex-col lg:justify-end ${hideSidebar && 'lg:overflow-hidden'}`}>

          <button
            type="button"
            className={`${hideSidebar ? 'hidden lg:flex lg:absolute lg:w-[5vw] lg:bottom-0 lg:left-0 lg:h-16 dark:lg:bg-slate-800 dark:lg:hover:bg-indigo-400 lg:bg-indigo-700 lg:hover:bg-indigo-400' : 'hidden lg:flex lg:w-[19vw]'} items-center gap-4 pl-6 py-4 mb-4 font-semibold rounded-r-full text-gray-500 lg:hover:text-indigo-700 lg:hover:bg-gray-100 transition-all duration-200 ease-in-out`}
            onClick={handleHideSidebar}
          >
            {
              hideSidebar
                ? (<img src="/assets/icon-show-sidebar.svg" alt="Show sidebar" />)
                : (<img src="/assets/icon-hide-sidebar.svg" alt="Hide sidebar" />)
            }

            <span className={`${hideSidebar && 'hidden'}`}>
              Hide Sidebar
            </span>
          </button>

          <ToggleTheme />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
