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
import { Cookies } from "react-cookie";
import UserService from "../services/user.service";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const auth = getAuth(app);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};


const getUser = () => {
  const userInfo = cookies.get("UserInfo") || null;
  return userInfo;
};
  const logout = () => {
    return signOut(auth);
  };
  /** SING UP WITH Google WebMailNpru */
  // const signUpWithGoogle = async () => {
  //   const provider = new GoogleAuthProvider();

  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const email = result.user.email;

  //     // ตรวจสอบว่าอีเมลต้องลงท้ายด้วย @webmail.npru.ac.th เท่านั้น
  //     if (!email.endsWith("@webmail.npru.ac.th")) {
  //       await signOut(auth); // บังคับล็อกเอาต์
  //       Swal.fire({
  //         icon: "error",
  //         title: "Access Denied",
  //         text: "Only emails ending with @webmail.npru.ac.th are allowed!",
  //       });
  //       return null; // ไม่อนุญาตให้ล็อกอิน
  //     }

  //     setUser(result.user); // อัปเดตสถานะผู้ใช้
  //     return result.user;
  //   } catch (error) {
  //     console.error("Google Sign-In Error:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Login Failed",
  //       text: error.message,
  //     });
  //   }
  // };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Sign up using Github
  const signUpWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const getToken = (cookies) => {
    const savedUser = cookies.get("Token");
    return savedUser;
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
    getUser,
    login,
    logout,
    getToken,
    isLoading,
    signUpWithGoogle,
    signUpWithGithub,
    signUpWithFacebook,
    updateProfile,
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const { email } = currentUser;
        const { data } = await UserService.signJwt(email);
        if (data.token) {
          cookies.set("Token", data.token);
          cookies.set("UserInfo", data.userInfo);
        } else {
          cookies.remove("UserInfo");
          cookies.remove("Token");
        }
      } else {
        setUser(null);
        cookies.remove("UserInfo");
        cookies.remove("Token");
      }
      setIsLoading(false);
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
