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

      if (response.ok) {
        const user = await response.json();
        sessionStorage.setItem("user", JSON.stringify(user));
        toast.success("Login successful!");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        const errorMsg = await response.text();
        toast.error("Login failed: " + errorMsg);
      }
    } catch (error) {
      toast.error("Error during login:" + error);
    }
  };

  return { handleLogin };
};

export default useLogin;
