import React from "react";
import { assistants } from "./data";
import AssistantWidget from "./components/AssistantWidget";
import "./App.css";

function App() {
  return (
    <div className="container">
      <header>
        <img src="/logo_cléa.jpg" alt="Logo Cléa" className="logo-clea" />
        <h1>Assistants Vocaux Cléa</h1>
      </header>
      <main>
        <div className="assistant-list">
          {assistants.map((assistant, index) => (
            <div className="assistant-item" key={assistant.id}>
              <h2>{assistant.name}</h2>
              <AssistantWidget agentId={assistant.id} index={index} name={assistant.name} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
