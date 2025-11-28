import { useNavigate } from "react-router-dom";

const useLogin = (setIsAuthenticated,setMessage, setError) => {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        sessionStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
        setMessage("Login successful!");
        navigate("/");
      } else {
        const errorMsg = await response.text();
        setError("Login fialed: " + errorMsg);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return { handleLogin };
};

export default useLogin;
