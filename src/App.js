import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";
import SettingsForm from "./components/SettingsForm";
import LoadableSetupDisplay from "./components/LoadableSetupDisplay";
import useGPRandomizer from "./hooks/useGPRandomizer";

const App = () => {
  const [form, setForm] = useState({ seed: 0 });
  const [setup, loading, error] = useGPRandomizer();

  return (
    <div className="App">
      <About />
      <SettingsForm loading={loading} data={form} onInput={setForm} />
      <LoadableSetupDisplay setup={setup} loading={loading} error={error} />
      <Footer />
    </div>
  );
};

const Wrapper = () => (
  <Router>
    <QueryParamProvider ReactRouterRoute={Route}>
      <App />
    </QueryParamProvider>
  </Router>
);
export default Wrapper;
