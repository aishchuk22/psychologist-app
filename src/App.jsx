import React, { useState } from "react";
import AuthModal from "./components/AuthModal/AuthModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>App with Firebase Auth</h1>
      <button onClick={() => setIsModalOpen(true)}>Open Auth Modal</button>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;