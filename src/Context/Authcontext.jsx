import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Make sure path is correct

const userContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setUser(currUser);
        console.log("Signed In");
        localStorage.setItem("user", JSON.stringify(currUser));
      } else {
        setUser(null);
        console.log("Signed Out");
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe(); // 👈 cleanup
  }, []);

  return (
    <userContext.Provider value={user}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);

export default AuthContextProvider;
