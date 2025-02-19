import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";
import UserService from "../services/user.service";

const SignUp = ({ isLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const { login, createUser, signUpWithGoogle } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (isLogin) {
      // Login logic
      login(data.email, data.password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          Swal.fire({
            title: "Login Successful",
            text: "You have logged in successfully!",
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
            title: "Login Failed",
            text: "Invalid email or password",
            icon: "error",
          });
        });
    } else {
      // Register logic
      createUser(data.email, data.password)
        .then(async (result) => {
          const user = result.user;
          console.log(user);
          await UserService.addUser(user.email);
          Swal.fire({
            title: "Registration Successful",
            text: "You have registered successfully!",
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
    }
  };

  const googleSignup = () => {
    signUpWithGoogle()
      .then(async (result) => {
        const user = result.user;
        await UserService.addUser(user.email);
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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Log In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="btn bg-red w-full text-white">
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </div>
          {/* Providers icon */}
          <div className="space-x-3 mt-3 flex justify-center items-center">
            <button className="btn rounded-full" onClick={googleSignup}>
              <FaGoogle className="size-4" />
            </button>
            <button className="btn rounded-full">
              <FaFacebook className="size-4" />
            </button>
            <button className="btn rounded-full">
              <FaGithub className="size-4" />
            </button>
          </div>
        </form>

        <p className="text-center mt-4">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 underline">
                Sign Up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/" className="text-blue-600 underline">
                Log In
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
