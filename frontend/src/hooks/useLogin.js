import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

const useLogin = (setIsAuthenticated, email, password) => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      
      if (response.ok) {
        sessionStorage.setItem("user", JSON.stringify(data));
        toast.success("Login successful!");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        toast.error("Login failed: " + data.error);
      }
    } catch (error) {
      toast.error("Error during login:" + error);
    }
  };

  return { handleLogin };
};

export default useLogin;
