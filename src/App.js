import "./App.css";
import { Fragment } from "react";
import Layout from "./components/layout/Layout";
import AuthForm from "./components/auth/AuthForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/welcome/Welcome";
import Profile from "./components/profile/Profile";
import { AuthContextProvider } from "./store/AuthContext";
import VerifyEmail from "./components/verify/VerifyEmail";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<AuthForm />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/email" element={<VerifyEmail />} />
            </Routes>
          </Layout>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;

// dj
