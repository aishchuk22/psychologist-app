import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../schemas/registerSchema";
import styles from "./RegisterForm.module.css";
import { registerUser } from "../../../services/authService";

const RegisterForm = ({ onClose, openLoginModal }) => {
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
      onClose(); // закриваємо RegisterModal
      openLoginModal(); // одразу відкриваємо LoginModal
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input type="text" placeholder="Name" {...register("name")} />
      {errors.name && <p className={styles.error}>{errors.name.message}</p>}

      <input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}

      <input type="password" placeholder="Password" {...register("password")} />
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
