import { useState } from "react";
import AuthModal from "./components/AuthModal/AuthModal";
import { Toaster } from "react-hot-toast";
import AppRouter from "./AppRouter";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <AppRouter />
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;


// import { useState } from "react";
// import AuthModal from "./components/AuthModal/AuthModal";
// import Header from "./components/Header/Header";
// import PsychologistsPage from "./pages/PsychologistsPage";

// import { Toaster } from "react-hot-toast";

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div>
//       <Header />
//       <h1>App with Firebase Auth</h1>
//       <button onClick={() => setIsModalOpen(true)}>Open Auth Modal</button>

//       <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

//       <PsychologistsPage />

//       <Toaster position="top-center" reverseOrder={false} />
//     </div>
//   );
// }

// export default App;
