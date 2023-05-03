import useThemeContext from '../hooks/useThemeContext';
import Logout from './Logout';

function Header() {
  const { theme } = useThemeContext();

  return (
    <header className="bg-white dark:bg-slate-800 p-4 lg:px-6 fixed z-20 w-full">
      <div className="flex justify-between items-center gap-4 lg:gap-32">
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
          >
            Platform Launch
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <Logout />
            </div>

            <button
              type="button"
              className="bg-indigo-700 rounded-full text-white font-semibold px-4 py-2 flex items-center gap-2 text-xl lg:text-lg lg:hover:bg-indigo-500 transition-all duration-300 ease-in-out"
            >
              <span>
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
                </svg>
              </span>

              <span className="hidden lg:block">Add New Task</span>
            </button>

            <button type="button" className="p-1">
              <img src="/assets/icon-vertical-ellipsis.svg" alt="Menu board" className="w-1" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;