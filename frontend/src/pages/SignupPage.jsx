import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";

const SignupPage = ({ setIsAuthenticated }) => {
  const nameInput = useField('text');
  const emailInput = useField('text');
  const passwordInput = useField('password');
  const password2Input = useField('password');
  const phoneNumberInput = useField('text');
  const genderInput = useField('text');
  const addressInput = useField('text');
  const cityInput = useField('text');
  const zipCodeInput = useField('text');

  const { handleSignup } = useSignup(setIsAuthenticated,
    nameInput.value, emailInput.value, passwordInput.value, password2Input.value, 
    phoneNumberInput.value, genderInput.value, addressInput.value, cityInput.value, zipCodeInput.value);

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={handleSignup}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Signup</h2>
            <div className='mb-4'>
              <label htmlFor='type' className='block text-gray-700 font-bold mb-2' >
                Name
              </label>
              <input {...nameInput} id='name' name='name'
                className='border rounded w-full py-2 px-3 mb-2'
                required />
            </div>

            <div className='mb-4'>
              <label htmlFor='type' className='block text-gray-700 font-bold mb-2' >
                Email
              </label>
              <input {...emailInput} id='email' name='email'
                className='border rounded w-full py-2 px-3 mb-2'
                required />
            </div>

            <div className='mb-4'>
              <label htmlFor='type' className='block text-gray-700 font-bold mb-2' >
                Password
              </label>
              <input {...passwordInput} id='password' name='password'
                className='border rounded w-full py-2 px-3 mb-2'
                required />
            </div>

            <div className='mb-4'>
              <label htmlFor='type' className='block text-gray-700 font-bold mb-2' >
                Confirm Password
              </label>
              <input {...password2Input} id='password2' name='password2'
                className='border rounded w-full py-2 px-3 mb-2'
                required />
            </div>

            <div className='mb-4'>
              <label htmlFor='type' className='block text-gray-700 font-bold mb-2' >
                Phone Number
              </label>
              <input {...phoneNumberInput} id='phone_number' name='phone_number'
                className='border rounded w-full py-2 px-3 mb-2'
                required />
            </div>

            <div className='mb-4'>
              <label htmlFor='type' className='block text-gray-700 font-bold mb-2' >
                Gender
              </label>
              <input {...genderInput} id='gender' name='gender'
                className='border rounded w-full py-2 px-3 mb-2'
                required />
            </div>

            <div className='mb-4'>
              <label htmlFor='type' className='block text-gray-700 font-bold mb-2' >
                Address
              </label>
              <input {...addressInput} id='address' name='address'
                className='border rounded w-full py-2 px-3 mb-2'
                required />
            </div>

            <div className='mb-4'>
              <label htmlFor='type' className='block text-gray-700 font-bold mb-2' >
                City
              </label>
              <input {...cityInput} id='city' name='city'
                className='border rounded w-full py-2 px-3 mb-2'
                required />
            </div>

            <div className='mb-4'>
              <label htmlFor='type' className='block text-gray-700 font-bold mb-2' >
                Zip Code
              </label>
              <input {...zipCodeInput} id='zip_code' name='zip_code'
                className='border rounded w-full py-2 px-3 mb-2'
                required />
            </div>

            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Signup
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage