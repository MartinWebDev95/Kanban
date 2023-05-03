import supabase from '../../supabase';
import useAuthContext from '../hooks/useAuthContext';
import useThemeContext from '../hooks/useThemeContext';

function Header() {
  const { theme } = useThemeContext();
  const { currentUser } = useAuthContext();

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
            onClick=""
          >
            Platform Launch
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm lg:text-lg">
              <p className="font-semibold dark:text-white text-black">
                {`Hi, ${currentUser?.name}!`}
              </p>

              <span className="text-slate-500">-</span>

              <button
                type="button"
                onClick={async () => { await supabase.auth.signOut(); }}
                className="group"
              >
                <svg fill="#828FA3" width="18px" height="18px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-indigo-700">
                  <path d="M116.832 543.664H671.28c17.696 0 32-14.336 32-32s-14.304-32-32-32H118.832l115.76-115.76c12.496-12.496 12.496-32.752 0-45.248s-32.752-12.496-45.248 0l-189.008 194 189.008 194c6.256 6.256 14.432 9.376 22.624 9.376s16.368-3.12 22.624-9.376c12.496-12.496 12.496-32.752 0-45.248zM959.664 0H415.663c-35.36 0-64 28.656-64 64v288h64.416V103.024c0-21.376 17.344-38.72 38.72-38.72h464.72c21.391 0 38.72 17.344 38.72 38.72l1.007 818.288c0 21.376-17.328 38.72-38.72 38.72H454.816c-21.376 0-38.72-17.344-38.72-38.72V670.944l-64.416.08V960c0 35.344 28.64 64 64 64h543.984c35.36 0 64.016-28.656 64.016-64V64c-.015-35.344-28.671-64-64.015-64z" />
                </svg>
              </button>
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

            <button type="button" className="p-1" onClick="">
              <img src="/assets/icon-vertical-ellipsis.svg" alt="Menu board" className="w-1" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
