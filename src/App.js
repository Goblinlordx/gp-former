import React, { useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import useGPRandomizer from "./hooks/useGPRandomizer";
import About from "./About";
import SettingsForm from "./SettingsForm";
import GaiaProjectSetupDisplay from "./GaiaProjectSetupDisplay";

function App() {
  const [form, setForm] = useState({ seed: 0 });
  const [state, run] = useGPRandomizer(form);

  return (
    <div className="App">
      <About />
      <SettingsForm data={form} onInput={setForm} onSubmit={run} />
      {state && <GaiaProjectSetupDisplay setup={state} />}
    </div>
  );
}

export default App;
