import { useCookies } from "react-cookie";

const SignIn = () => {
  const { login, signUpWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [cookies, setCookie] = useCookies(["token"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log("User signed in:", user);
        // Get the token from Firebase
        user.getIdToken().then((token) => {
          // Set the token in cookies
          setCookie("token", token); // expires in 1 hour
          Swal.fire({
            icon: "success",
            title: "Signin Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        console.error("Signin failed:", error.message);
        Swal.fire({
          icon: "error",
          title: "Signin Failed",
          text: error.message,
        });
      });
  };

  const googleSignup = () => {
    signUpWithGoogle()
      .then((result) => {
        const user = result.user;
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
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
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
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
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
            <button type="submit" h className="btn bg-red  w-full text-white">
              Sign IN
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
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
