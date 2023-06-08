import ToggleTheme from '../components/ToggleTheme';
import useAuthContext from '../hooks/useAuthContext';

function Login() {
  const {
    handleLogin, handleLoginWithGoogle, handleLoginWithGithub, register, handleSubmit, errors,
  } = useAuthContext();

  return (
    <main className="grid place-content-center place-items-center w-full px-8">
      <section className="bg-white dark:bg-slate-800 p-8 rounded-md shadow-xl">
        <h1 className="text-center text-black dark:text-white font-semibold text-2xl">
          Kanban Task Management
        </h1>

        <h2 className="text-center text-black dark:text-white font-semibold my-4 uppercase">
          Login
        </h2>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-4 lg:mx-auto"
        >
          <label htmlFor="email" className="flex flex-col gap-2">
            <p className="dark:text-white font-semibold text-black text-sm flex justify-between">
              <span>
                E-mail:
              </span>
              {errors.inputEmail && <span className="text-red-600">This is not a e-mail</span>}
            </p>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@kanban.com"
              className="bg-transparent border-2 rounded-md border-gray-300 dark:border-gray-500 p-2 font-semibold text-sm dark:text-white"
              {...register(
                'inputEmail',
                {
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  required: true,
                },
              )}
            />
          </label>

          <button
            type="submit"
            className="bg-indigo-700 rounded-full p-2 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 ease-in-out"
          >
            Sign in with email
          </button>
        </form>

        <button
          type="button"
          className="bg-indigo-700 rounded-full p-2 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 ease-in-out w-full mt-4 flex items-center justify-center gap-4 lg:mx-auto"
          onClick={handleLoginWithGoogle}
        >
          <img src="/assets/icon-google.svg" alt="Login with Google" className="w-7 h-7" />
          Sign in with Google
        </button>

        <button
          type="button"
          className="bg-black rounded-full p-2 hover:bg-zinc-900 text-white font-semibold transition-all duration-200 ease-in-out w-full mt-4 flex items-center justify-center gap-4 lg:mx-auto"
          onClick={handleLoginWithGithub}
        >
          <img src="/assets/logo-github.png" alt="Login with Github" className="w-7 h-7" />
          Sign in with Github
        </button>

        <div className="lg:mx-auto mt-4">
          <ToggleTheme />
        </div>
      </section>
    </main>
  );
}

export default Login;
