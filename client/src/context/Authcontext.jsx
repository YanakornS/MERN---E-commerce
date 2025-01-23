import { createContext, useEffect, useState } from "react";
import app from "../configs/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  getAuth,
  updateProfile as firebaseUpdateProfile,
} from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  // Sign up using Github
  const signUpWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Sign up using Facebook
  const signUpWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Update Profile function
  const updateProfile = (newName, newPhotoURL) => {
    if (auth.currentUser) {
      return firebaseUpdateProfile(auth.currentUser, {
        displayName: newName,
        photoURL: newPhotoURL,
      })
        .then(() => {
          // Update local state after successfully updating profile
          setUser({
            ...auth.currentUser,
            displayName: newName,
            photoURL: newPhotoURL,
          });
          console.log("Profile updated successfully");
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    } else {
      console.error("No user is currently logged in");
      return Promise.reject("No user is currently logged in");
    }
  };

  const authInfo = {
    user,
    createUser,
    login,
    logout,
    signUpWithGoogle,
    signUpWithGithub,
    signUpWithFacebook,
    updateProfile,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => {
      return unsubscribe();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
