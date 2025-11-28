import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "./useFetch";

const useLogin = (setIsAuthenticated, email, password) => {
  const navigate = useNavigate();

  const { execute, loading } = useFetch("/api/users/login", {}, true);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch("/api/users/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      // console.log(data);

      const data = await execute({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      // if (response.ok) {
      sessionStorage.setItem("user", JSON.stringify(data));
      toast.success("Login successful!");
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
    // } catch (error) {
    //   toast.error("Error during login:" + error);
    // }
  };

  return { handleLogin };
};

export default useLogin;
