import "./App.css";
import { Fragment } from "react";
import Layout from "./components/layout/Layout";
import AuthForm from "./components/auth/AuthForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/welcome/Welcome";

function App() {
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
        </Router>
      </Layout>
    </>
  );
}

export default App;

// dj
