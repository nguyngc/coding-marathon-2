import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import useFetch from "./useFetch";

const useSignup = function (setIsAuthenticated, name, email, password, password2,
  phoneNumer, gender, addressStreet, city, zipCode) {

  const navigate = useNavigate();
  const { execute, loading } = useFetch("/api/users/register", {}, true);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password2 !== password) {
      toast.error('Passwords do not match');
      return;
    }

    const newUser = {
      name,
      email,
      password,
      phone_number: phoneNumer,
      gender,
      address:
      {
        street: addressStreet,
        city: city,
        zipCode: zipCode
      }
    }

    try {
      // const response = await fetch("/api/users/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newUser),
      // });

      // const data = await response.json();
      // console.log(data);

      const data = await execute({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      // if (response.ok) {
      sessionStorage.setItem("user", JSON.stringify(data));
      toast.success('User signed up Successfully');
      setIsAuthenticated(true);
      navigate("/");
      return;
    } catch (error) {
      toast.error('Signup failed: ' + error.message);
      return;
    }
    // } catch (error) {
    //   console.log(error);
    //   toast.error('Error during signup:' + error);
    //   return;
    // }
  };

  return {
    handleSignup
  };
};

export default useSignup;