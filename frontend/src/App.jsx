import toast, { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NoteDetailsPage } from "./pages/NoteDetailsPage";
import { GoogleLoginButton } from "./features/auth/components/GoogleLoginButton";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:noteId" element={<NoteDetailsPage />} />
    </Routes>
  );
};

export default App;
