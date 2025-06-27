import { useState } from "react";
import AuthModal from "./components/AuthModal/AuthModal";
import Header from "./components/Header/Header";

import PsychologistsList from "./components/PsychologistList/PsychologistList";

import { Toaster } from "react-hot-toast";

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Header />
      <h1>App with Firebase Auth</h1>
      <button onClick={() => setIsModalOpen(true)}>Open Auth Modal</button>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PsychologistsList />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;