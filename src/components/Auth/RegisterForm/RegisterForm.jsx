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
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.description}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Name"
          className={styles.input}
          {...register("name")}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.inputGroup}>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          {...register("email")}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.input}
            {...register("password")}
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
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { registerSchema } from "../../../schemas/registerSchema";
// import { registerUser } from "../../../services/authService";
// import styles from "./RegisterForm.module.css";
// import { Eye, EyeOff } from "lucide-react";

// const RegisterForm = ({ onClose, openLoginModal }) => {
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(registerSchema),
//   });

//   const onSubmit = async (data) => {
//     const success = await registerUser(data.name, data.email, data.password);
//     if (success) {
//       onClose();
//       openLoginModal();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
//       <h2>Register</h2>
//       <p>
//         Welcome! Please fill in the information below to create your account and
//         start your journey.
//       </p>

//       <input type="text" placeholder="Name" {...register("name")} />
//       {errors.name && <p className={styles.error}>{errors.name.message}</p>}

//       <input type="email" placeholder="Email" {...register("email")} />
//       {errors.email && <p className={styles.error}>{errors.email.message}</p>}

//       <div className={styles.passwordWrapper}>
//         <input
//           type={showPassword ? "text" : "password"}
//           placeholder="Password"
//           {...register("password")}
//         />
//         <button
//           type="button"
//           className={styles.eyeButton}
//           onClick={() => setShowPassword((prev) => !prev)}
//         >
//           {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
//         </button>
//       </div>
//       {errors.password && (
//         <p className={styles.error}>{errors.password.message}</p>
//       )}

//       <button type="submit" className={styles.submitButton}>
//         Register
//       </button>
//     </form>
//   );
// };

// export default RegisterForm;
