import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../schemas/registerSchema";
import styles from "./RegisterForm.module.css";
import { registerUser } from "../../../services/authService";

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
    } catch {
      // Помилки обробляються у authService через toast
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;