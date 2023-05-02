import ToggleTheme from '../components/ToggleTheme';

function Login() {
  const handleLogin = () => {

  };

  const handleChangeEmail = () => {

  };

  const handleLoginWithGoogle = () => {

  };

  return (
    <main className="grid place-content-center place-items-center h-screen w-full px-8">
      <section className="bg-white dark:bg-slate-800 p-8 rounded-md shadow-xl">
        <h1 className="text-center text-black dark:text-white font-semibold text-2xl">Kanban Task Management</h1>

        <h2 className="text-center text-black dark:text-white font-semibold my-4 uppercase">
          Login
        </h2>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 lg:mx-auto"
        >
          <label htmlFor="email" className="flex flex-col gap-2">
            <span className="dark:text-white font-semibold text-black text-sm">
              E-mail:
            </span>
            <input
              type="email"
              name="email"
              id="email"
              value=""
              className="bg-transparent border-2 rounded-md border-gray-300 dark:border-gray-500 p-2 font-semibold text-sm dark:text-white"
              onChange={handleChangeEmail}
            />
          </label>

          <button
            type="submit"
            className="bg-indigo-700 rounded-full p-2 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 ease-in-out"
          >
            Login
          </button>
        </form>

        <button
          type="button"
          className="bg-indigo-700 rounded-full p-2 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 ease-in-out w-full mt-4 flex items-center justify-center gap-4 lg:mx-auto"
          onClick={handleLoginWithGoogle}
        >
          <img src="/assets/icon-google.svg" alt="Login with Google" className="w-7 h-7" />
          Login with Google
        </button>

        <div className="lg:mx-auto mt-4">
          <ToggleTheme />
        </div>
      </section>
    </main>
  );
}

export default Login;
