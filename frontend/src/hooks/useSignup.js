import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const useSignup = function (setIsAuthenticated, name, email, password, password2,
  phoneNumer, gender, addressStreet, city, zipCode) {

  const navigate = useNavigate();

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

    console.log(newUser);

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      console.log(data);
        
      if (response.ok) {
        sessionStorage.setItem("user", JSON.stringify(data));
        toast.success('User signed up Successfully');
        setIsAuthenticated(true);
        navigate("/");
        return;
      } else {
        toast.error('Signup failed: ' + data.error);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error('Error during signup:' + error);
      return;
    }
  };

  return {
    handleSignup
  };
};

export default useSignup;