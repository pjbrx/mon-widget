import React, { useEffect, useRef, useState } from "react";

const AssistantWidget = ({ agentId, index, name }) => {
  const widgetRef = useRef(null);
  const [isHidden, setIsHidden] = useState(true);
  
  // Calcul dynamique de la hauteur (départ 80%, réduit de 17.5% à chaque widget)
  const heightPercentage = 80 - index * 17.5;

  useEffect(() => {
    // Vérifie si le script est déjà chargé
    if (!document.querySelector("script[src='https://elevenlabs.io/convai-widget/index.js']")) {
      const script = document.createElement("script");
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }

    // Appliquer un style directement au widget après son chargement
    const interval = setInterval(() => {
      if (widgetRef.current) {
        widgetRef.current.style.position = "relative"; // Empêche qu'il soit en bas à droite
        widgetRef.current.style.height = `${heightPercentage}%`;
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Fonction pour afficher/masquer le widget
  const toggleWidget = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="widget-container">
      {name === "Exemple" ? (
        <>
          {/* Widget personnalisé pour l'entreprise "Exemple" */}
          <div className="custom-widget">
            <button onClick={toggleWidget}>Appeler notre IA</button>
            <button className="hangup" onClick={toggleWidget}>Raccrocher</button>
          </div>
          <div className={`hidden-widget ${isHidden ? "hidden" : ""}`}>
            <elevenlabs-convai ref={widgetRef} agent-id={agentId}></elevenlabs-convai>
          </div>
        </>
      ) : (
        // Widget normal pour toutes les autres entreprises
        <elevenlabs-convai ref={widgetRef} agent-id={agentId}></elevenlabs-convai>
      )}
    </div>
  );
};

export default AssistantWidget;
