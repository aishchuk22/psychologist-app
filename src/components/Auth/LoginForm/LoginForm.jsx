import { useForm } from "react-hook-form";
import { useState } from "react";

import { loginSchema } from "../../../schemas/loginSchema";
import { loginUser } from "../../../services/authService";

import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";

import styles from "./LoginForm.module.css";

const LoginForm = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const success = await loginUser(data.email, data.password);
    if (success) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>Log In</h2>
      <p className={styles.description}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
      </p>

      <div className={styles.inputGroup}>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className={styles.input}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
