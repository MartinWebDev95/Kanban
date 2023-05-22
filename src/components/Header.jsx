import { useState } from 'react';
import useDatabaseContext from '../hooks/useDatabaseContext';
import useThemeContext from '../hooks/useThemeContext';
import Logout from './Logout';
import SettingsModal from './SettingsModal';
import BoardModal from './BoardModal';
import DeleteModal from './DeleteModal';
import AddUpdateTaskModal from './AddUpdateTaskModal';

function Header({ showSidebar, setShowSidebar }) {
  const { theme } = useThemeContext();
  const { selectedBoard } = useDatabaseContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openAddUpdateTaskModal, setOpenAddUpdateTaskModal] = useState(false);

  return (
    <header className="bg-white dark:bg-slate-800 px-4 lg:px-6 fixed z-20 w-full top-0 h-16 lg:h-20">
      <div className="flex justify-between items-center gap-4 lg:gap-24 h-full">
        {theme === 'dark'
          ? (
            <picture>
              <source srcSet="/assets/logo-light.svg" media="(min-width: 1024px)" type="image/svg+xml" />
              <img src="/assets/logo-mobile.svg" alt="Kanban" />
            </picture>
          ) : (
            <picture>
              <source srcSet="/assets/logo-dark.svg" media="(min-width: 1024px)" type="image/svg+xml" />
              <img src="/assets/logo-mobile.svg" alt="Kanban" />
            </picture>
          )}

        <div className="flex items-center justify-between flex-1">
          <button
            type="button"
            className="text-2xl font-semibold dark:text-white text-black flex items-center gap-2 lg:pointer-events-none"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <span>
              {Object.entries(selectedBoard).length > 0 && selectedBoard.name}
            </span>

            {showSidebar
              ? (
                <img src="/assets/icon-chevron-up.svg" alt="Arrow up" className="lg:hidden" />
              ) : (

                <img src="/assets/icon-chevron-down.svg" alt="Arrow down" className="lg:hidden" />
              )}
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <Logout />
            </div>

            <button
              type="button"
              className="bg-indigo-700 rounded-full text-white font-semibold px-4 py-2 flex items-center gap-2 text-xl lg:text-lg lg:hover:bg-indigo-500 transition-all duration-300 ease-in-out"
              onClick={() => setOpenAddUpdateTaskModal(true)}
            >
              <span>
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
                </svg>
              </span>

              <span className="hidden lg:block">Add New Task</span>
            </button>

            <button
              type="button"
              className="w-5 h-5 lg:w-4 lg:h-4 flex justify-center"
              onClick={() => setOpenSettingsModal(!openSettingsModal)}
            >
              <img src="/assets/icon-vertical-ellipsis.svg" alt="Menu board" />
            </button>

            <SettingsModal
              openSettingsModal={openSettingsModal}
              setOpenSettingsModal={setOpenSettingsModal}
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />

            <BoardModal
              openBoardModal={openEditModal}
              setOpenBoardModal={setOpenEditModal}
              updating
            />

            <AddUpdateTaskModal
              openAddUpdateTaskModal={openAddUpdateTaskModal}
              setOpenAddUpdateTaskModal={setOpenAddUpdateTaskModal}
            />

            <DeleteModal
              openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
