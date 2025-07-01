import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { X } from "lucide-react";
import styles from "./AppointmentModal.module.css";
import { appointmentSchema } from "../../schemas/apptSchema";
import { toast } from "react-hot-toast";

const AppointmentModal = ({ isOpen, onClose, psychologist }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(appointmentSchema),
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleTextareaChange = (e) => {
    e.target.scrollTop = e.target.scrollHeight;
  };

  const onSubmit = (data) => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }
    if (!selectedTime) {
      toast.error("Please select a time");
      return;
    }

    const appointmentData = {
      ...data,
      date: selectedDate.toDateString(),
      time: selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      psychologist: psychologist.name,
    };

    console.log("Appointment Data:", appointmentData);
    toast.success("Appointment submitted!");
    reset();
    setSelectedDate(null);
    setSelectedTime(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className={styles.title}>
          Make an appointment with a psychologist
        </h2>

        <p className={styles.description}>
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>

        {psychologist && (
          <div className={styles.psychologistInfo}>
            <img
              src={psychologist.avatar_url}
              alt={psychologist.name}
              className={styles.avatar}
            />
            <span className={styles.name}>{psychologist.name}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            placeholder="Name"
            {...register("name")}
            className={styles.input}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}

          <input
            placeholder="+380"
            {...register("phone")}
            className={styles.input}
          />
          {errors.phone && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}

          <div className={styles.dateTimeRow}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              placeholderText="Select appointment date"
              dateFormat="yyyy-MM-dd"
              className={styles.input}
            />

            <DatePicker
              selected={selectedTime}
              onChange={(time) => setSelectedTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="HH:mm"
              placeholderText="Select appointment time"
              className={styles.input}
            />
          </div>

          <input
            placeholder="Email"
            {...register("email")}
            className={styles.input}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          <textarea
            placeholder="Comment"
            {...register("comment")}
            className={styles.textarea}
            onInput={handleTextareaChange}
          />
          {errors.comment && (
            <p className={styles.error}>{errors.comment.message}</p>
          )}

          <button type="submit" className={styles.submitButton}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
