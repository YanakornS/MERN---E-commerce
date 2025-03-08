import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";

const Modal = ({ name }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const {
    login,
    signUpWithGoogle,
    signUpWithGithub,
    signUpWithFacebook,
    createUser,
  } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("login").close();
        navigate(from, { replace: true });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };
  const googleSignUp = () => {
    signUpWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          icon: "success",
          title: "Signup Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("login").close();
 
        navigate(from, { replace: true });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error("Signup failed:", error.message);
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: error.message,
          showConfirmButton: true,
        });
      });
      
  };

  const GitHubSignup = () => {
    signUpWithGithub()
      .then((result) => {
        const user = result.user;
        document.getElementById(name).close();
        Swal.fire({
          title: "Registration Successful",
          text: "You have registered successfully with Google!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {          
          navigate(from); // Navigate to the original page or home
        
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Registration Failed",
          text: "An error occurred during registration.",
          icon: "error",
        });
      });
  };
  const googleSignup = () => {
    signUpWithGoogle()
      .then((result) => {
        const user = result.user;
        document.getElementById(name).close();
        Swal.fire({
          title: "Registration Successful",
          text: "You have registered successfully with Google!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate(from); // Navigate to the original page or home
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Registration Failed",
          text: "An error occurred during registration.",
          icon: "error",
        });
      });
  };

  // ฟังก์ชัน FacebookSignUp
  const facebookSignup = () => {
    signUpWithFacebook()
      .then((result) => {
        const user = result.user;
        document.getElementById(name).close();
        Swal.fire({
          title: "Registration Successful",
          text: "You have registered successfully with Facebook!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate(from); // Navigate to the original page or home
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Registration Failed",
          text: "An error occurred during registration.",
          icon: "error",
        });
      });
  };

  return (
    <div>
      {/*
      How to use
      onClick={() => document.getElementById("login").showModal()}
       */}
      <dialog id={name} className="modal">
        <div className="modal-box">
          <div className="modal-action mt-2 ml-2 flex-col justify-center">
            <h3 className="text-xl font-bold capitalize">{name}</h3>
          </div>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            {/* form section */}
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register(
                  "password",
                  { required: true },
                  { min: 6, max: 99 }
                )}
              />
              {/* Forgot password */}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* Submit btn */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-red text-white capitalize"
              >
                {name}
              </button>
            </div>
            {/* Sign up */}
            {name && name === "login" ? (
              <p className="text-center my-2">
                Don't have an account?{" "}
                <a href="/signup" className="underline ml-1 text-red">
                  Sign up now!
                </a>
              </p>
            ) : (
              <p className="text-center my-2">
                Have an account?{" "}
                <a href="/login" className="underline text-md ml-1">
                  Log In
                </a>
              </p>
            )}

            {/* Providers icon */}
            <div className="space-x-3 mt-3 flex justify-center items-center">
              <button className="btn rounded-full" onClick={googleSignUp}>
                <FaGoogle className="size-4" />
              </button>
              <button className="btn rounded-full" onClick={facebookSignup}>
                <FaFacebook className="size-4" />
              </button>
              <button className="btn rounded-full " onClick={GitHubSignup}>
                <FaGithub className="size-4" />
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Modal;
