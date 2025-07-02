import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../schemas/registerSchema";
import { registerUser } from "../../../services/authService";
import styles from "./RegisterForm.module.css";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = ({ onClose, openLoginModal }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const success = await registerUser(data.name, data.email, data.password);
    if (success) {
      onClose();
      openLoginModal();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2>Register</h2>
      <p>
        Welcome! Please fill in the information below to create your account and
        start your journey.
      </p>

      <input type="text" placeholder="Name" {...register("name")} />
      {errors.name && <p className={styles.error}>{errors.name.message}</p>}

      <input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}

      <div className={styles.passwordWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password")}
        />
        <button
          type="button"
          className={styles.eyeButton}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {errors.password && (
        <p className={styles.error}>{errors.password.message}</p>
      )}

      <button type="submit" className={styles.submitButton}>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
