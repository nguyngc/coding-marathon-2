import useField from "../hooks/useField";

import useLogin from "../hooks/useLogin";

const LoginComponent = ({ setIsAuthenticated }) => {
    const emailInput = useField("text");
    const passwordInput = useField("password");
    
    const { handleLogin } = useLogin(setIsAuthenticated,emailInput.value, passwordInput.value);

    return (
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <form onSubmit={handleLogin}>
                        <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Email
                            </label>
                            <input
                                {...emailInput}
                                id="email"
                                name="email"
                                className="border rounded w-full py-2 px-3 mb-2"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Password
                            </label>
                            <input
                                {...passwordInput}
                                id="password"
                                name="password"
                                className="border rounded w-full py-2 px-3 mb-2"
                                required
                            />
                        </div>
                       
                        <div>
                            <button
                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginComponent;
