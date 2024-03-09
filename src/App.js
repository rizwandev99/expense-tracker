import "./App.css";
import { Fragment } from "react";
import Layout from "./components/layout/Layout";
import AuthForm from "./components/auth/AuthForm";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <AuthForm />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

// dj
