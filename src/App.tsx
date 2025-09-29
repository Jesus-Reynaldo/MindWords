import "./App.css";
import VocabularyApp from "./feactures/vocabulary/pages/VocabularyApp";
import { Route, Routes } from "react-router";
import { ReviewPage } from "./feactures/vocabulary/pages/ReviewPage";
import Login from "./feactures/auth/Login";
import Signup from "./feactures/auth/Signup";
import ProtectedRoute from "./feactures/auth/components/ProtectedRoute";

function App() {
  return (
    //<Review words={words} />
    //<VocabularyApp />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/vocabulary" element={<ProtectedRoute><VocabularyApp /></ProtectedRoute>} />
      <Route path="/" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
