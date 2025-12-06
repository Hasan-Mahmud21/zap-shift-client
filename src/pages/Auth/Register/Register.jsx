// import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  console.log("in register page", location);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(async (result) => {
        // 1️⃣ Upload image to imgbb
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        const imgResponse = await axios.post(image_API_URL, formData);

        const imageURL = imgResponse.data.data.url; // ✔ correct
        console.log("imgbb image URL:", imageURL);

        // 2️⃣ Update firebase profile with actual image URL
        const userProfile = {
          displayName: data.name,
          photoURL: imageURL, // ✔ this is correct
        };

        updateUserProfile(userProfile)
          .then(() => {
            console.log("user profile updated");
            navigate(location.state || "/");
          })
          .catch((error) => {
            console.log(error);
          });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center font-bold">Welcome to Zap Shift</h3>
      <p className="text-center font-semibold">Please Register Here</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* Name field */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <span className="text-error">Name is required</span>
          )}
          {/* Image field */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="photo"
          />
          {errors.file?.type === "required" && (
            <span className="text-error">Photo is required</span>
          )}
          {/* Email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <span className="text-error">Email is required</span>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <span className="text-error">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-error">
              Password must be at least 6 characters
            </span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-error">
              Password must have at least one uppercase, at least one lowercase,
              at least one number, and at least one special characters
            </span>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an account?{" "}
          <Link
            state={location.state}
            to="/login"
            className="text-blue-400 underline"
          >
            login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
