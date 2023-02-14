import { Link } from 'react-router-dom';
import { useAuthStore, useForm } from '../../hooks';
import CustomAlert from '../../ui/alert/CustomAlert';

const formFields = {
  email: 'alex@test.com',
  password: '123123qweQWE',
};

const LoginPage = () => {
  const { startLogin, setErrorMessage, errorMessage } = useAuthStore();
  const { email, password, handleInputChange, formValues, reset } =
    useForm(formFields);

  const hanldeLogin = async e => {
    e.preventDefault();
    if (Object.values(formValues).some(field => !field))
      return setErrorMessage(['All fields are required']);

    await startLogin({ email, password });

    reset();
  };

  return (
    <section className="mt-20">
      <dir className="border-0 my-10 bg-white shadow rounded-xl p-10">
        <div className="p-6 pb-0 mb-1">
          <h3 className="font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text text-2xl mb-1">
            Welcome back
          </h3>
          <p className="mb-0">Enter your email and password to sign in</p>
        </div>

        <div className="flex-auto p-6">
          {errorMessage && <CustomAlert />}

          <form role="form" onSubmit={hanldeLogin}>
            <label
              className="mb-2 ml-1 font-bold text-xs text-slate-700"
              htmlFor="email"
            >
              Email
            </label>
            <div className="mb-4">
              <input
                type="email"
                className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-blue-400 focus:outline-none focus:transition-shadow"
                placeholder="Email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <label
              className="mb-2 ml-1 font-bold text-xs text-slate-700"
              htmlFor="pass"
            >
              Password
            </label>
            <div className="mb-4">
              <input
                type="password"
                className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-blue-400 focus:outline-none focus:transition-shadow"
                placeholder="Password"
                id="pass"
                name="pass"
                value={password}
                onChange={handleInputChange}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
              >
                Sign in
              </button>
            </div>

            <div className="p-6 px-1 mt-6 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
              <p className="mx-auto mb-6 leading-normal text-sm">
                Dont have an account?
                <Link
                  to="/register"
                  className="relative pl-3 z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dir>
    </section>
  );
};

export default LoginPage;
