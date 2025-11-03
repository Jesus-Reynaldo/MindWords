import "./App.css";
import VocabularyApp from "./feactures/vocabulary/pages/VocabularyApp";
import { Route, Routes } from "react-router";
import { ReviewPage } from "./feactures/vocabulary/pages/ReviewPage";
import Login from "./feactures/auth/Login";
import Signup from "./feactures/auth/Signup";
import ProtectedRoute from "./feactures/auth/components/ProtectedRoute";
import Layout from "./feactures/layout/Layout";
import { GrammarPage } from "./feactures/grammar/pages/GrammarPage";
import { GrammarTopicsPage } from "./feactures/grammar/pages/GrammarTopicsPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/review" element={<ReviewPage />}  />
        <Route path="/vocabulary" element={<VocabularyApp />} />
        <Route path="/" element={<ReviewPage />} />
        <Route path="/grammar/:grammarId" element={<GrammarPage />} />
        <Route path="/grammar" element={<GrammarTopicsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
