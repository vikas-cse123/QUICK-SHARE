import { Route, Routes } from "react-router-dom";
import  { Toaster } from "react-hot-toast";
import { HomePage } from "./pages/HomePage";
import { NoteDetailsPage } from "./pages/NoteDetailsPage";
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
