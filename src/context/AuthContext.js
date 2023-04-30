import React, { useEffect, useRef, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router";
import Loader from "../Helpers/Loader";
import { collection, getDocs } from "firebase/firestore";
import { createUserInDb, fetchUser } from "api/api";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  // const location = useLocation();
  const timeout = useRef();

  async function login({ email, password }) {
    try {
      setIsLoading(true); //this helps show loading screen when trying to fetch data from the firestore
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message;
      console.log(errorMessage);
      setErrorMessage("Invalid Email/Password");
    }
  }

  function register({ email, password, firstName, lastName }) {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        createUserInDb({
          email,
          uid: user?.uid,
          role: "OWNER",
          firstName,
          lastName,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === "auth/weak-password") {
          setErrorMessage({ password: errorMessage });
        } else {
          setErrorMessage({ email: errorMessage });
        }
      });
  }

  function signOutUser() {
    signOut(auth)
      .then(() => {
        console.log("Sign Out Sucessfull");
        navigate("/owner-login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const subscription = onAuthStateChanged(auth, async (user) => {
      if (user != null) {
        const usr = await fetchUser(user?.uid);

        if (usr) {
          setIsAuthenticated(true);
          setUser(usr);
          navigate("/");
        } else {
          setIsAuthenticated(false);
          console.log("User Not found in DB");
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        console.log("😢 We are not authenticated!");
      }
      setIsLoading(false);
    });
    return () => {
      subscription();
      clearTimeout(timeout.current);
    };
  }, []);

  const setErrorMessage = (err) => {
    setError(err);
    if (timeout.current) {
      console.log(timeout.current);
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setError(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchedProperties = [];
    console.log("Fetching Properties");

    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "properties"));
      querySnapshot.forEach((doc) => {
        fetchedProperties.push(doc.data());
      });
      setProperties(fetchedProperties);
    }
    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signOutUser,
        login,
        error,
        properties,
        setProperties,
        register,
      }}
    >
      {!isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};
